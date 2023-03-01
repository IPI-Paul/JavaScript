import json
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import consumers


class State:
    pass


State.data: [] = []

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)


class Delivery:
    def __init__(self, **kwargs):
        self.budget: int = 0
        self.notes: str = ''
        self.pk: int = len(State.data) + 1
        self.__dict__.update(kwargs)

    def save(self):
        return self


class Event:
    def __init__(self, **kwargs):
        self.delivery_id: str = None
        self.type: str
        self.data: str
        self.__dict__.update(kwargs)

    def save(self):
        return self


class Redis:
    def __init__(self, **kwargs):
        self.delivery: {} = None

    def get(self):
        global State
        if not State.data:
            return None
        return json.dumps([item for item in State.data if item.get('id') == int(self.split(":")[1])])

    def set(self, kwargs):
        print(kwargs)
        global State
        idx = 1
        if len(self.split(":")) > 1:
            idx = self.split(":")[1]
        if not [item for item in State.data if item.get('id') == int(idx)]:
            State.data += [json.loads(kwargs)]
        else:
            State.data = [item for item in State.data if item.get('id') != int(idx)]
            State.data += [json.loads(kwargs)]


@app.get('/deliveries/{pk}/status')
async def get_state(pk: str):
    state = Redis.get(f'delivery:{pk}')

    if state is not None:
        return json.loads(state)

    state = build_state(pk)
    Redis.set(f'delivery:{pk}', json.dumps(state))
    return state


def build_state(pk: str):
    raise HTTPException(status_code=400, detail='Not using redis')
    pks = Event.all_pks()
    all_events = [Event.get(pk) for pk in pks]
    events = [event for event in all_events if event.delivery_id == pk]
    state = {}

    for event in events:
        state = consumers.CONSUMERS[event.type](state, event)
    return state


@app.post('/deliveries/create')
async def create(request: Request):
    body = await request.json()
    delivery = Delivery(budget=body['data']['budget'], notes=body['data']['notes']).save()
    event = Event(delivery_id=delivery.pk, type=body['type'], data=json.dumps(body['data'])).save()
    state = consumers.CONSUMERS[event.type]({}, event)
    Redis.set(f'delivery:{delivery.pk}', json.dumps(state))
    return delivery, event, state


@app.post('/event')
async def dispatch(request: Request):
    body = await request.json()
    print(body)
    delivery_id = body['delivery_id']
    event = Event(delivery_id=delivery_id, type=body['type'], data=json.dumps(body['data'])).save()
    state = await get_state(delivery_id)
    new_state = consumers.CONSUMERS[event.type](state[0], event)
    Redis.set(f'delivery:{delivery_id}', json.dumps(new_state))
    return new_state
