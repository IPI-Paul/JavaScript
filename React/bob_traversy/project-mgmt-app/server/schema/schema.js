const { projects, clients } = require('../sampleData.js');
const Project = require('../models/Project');
const Client = require('../models/Client');
const util = require('util');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, 
  GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLEnumType 
} = require('graphql');
const { request } = require('express');

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    sqlMessage: { type: GraphQLString }
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      }
    },
    sqlMessage: { type: GraphQLString }
  })
});

const TableType = new GraphQLObjectType({
  name: 'Tables',
  fields: () => ({
    fieldCount: { type: GraphQLInt },
    affectedRows: { type: GraphQLInt },
    insertId: { type: GraphQLInt },
    serverStatus: { type: GraphQLInt },
    warningCount: { type: GraphQLInt },
    message: { type: GraphQLString },
    protocol41: { type: GraphQLBoolean },
    changedRows: { type: GraphQLInt },
    sqlMessage: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: { 
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      }
    },
    clientSearch: { 
      type: new GraphQLList(ClientType),
      args: { 
        id: { type: GraphQLID }, 
        name: { type: GraphQLString } 
      },
      resolve(parent, args) {
        return Client.find(args);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: { 
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createClientTable: {
      type: TableType,
      args: {},   
      resolve(parent, args) {
        return Client.create();
      }   
    },
    createProjectTable: {
      type: TableType,
      args: {},   
      resolve(parent, args) {
        return Project.create();
      }   
    },
    dropClientTable: {
      type: TableType,
      args: {},   
      resolve(parent, args) {
        return Client.drop();
      }   
    },
    dropProjectTable: {
      type: TableType,
      args: {},   
      resolve(parent, args) {
        return Project.drop();
      }   
    },
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const client = new Client.addClient({
          name: args.name,
          email: args.email,
          phone: args.phone
        });
        return Client.save();
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then(
          projects => {
            projects.forEach(project => {
              project.remove();
            });
          }
        );
        return Client.findByIdAndRemove(args.id);
      }
    },
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
      }, 
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone
            }
          }, 
          {new: true}
        );
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' }
            }
          }),
          defaultValue: 'Not Started' 
        },
        clientId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const project = new Project.addProject({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId
        });
        
        return Project.save(project)
      }
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              'new': { value: 'Not Started' },
              'progress': { value: 'In Progress' },
              'completed': { value: 'Completed' }
            }
          }) 
        },
        clientId: { type: GraphQLID }
      }, 
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId
            }
          }, 
          {new: true}
        );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});