menu = () => {
  const { dispatch } = d3;

  let id, labelText, options, selected;
  const listners = dispatch('change');

  const my = (selection) => {
    selection
      .selectAll('label')
      .data([null])
      .join('label')
      .attr('for', id)
      .text(labelText);
    
    selection
      .selectAll('select')
      .data([null])
      .join('select')
      .attr('id', id)
      .on('change', event => (
        listners.call('change', null, event.target.value)
      ))
      .selectAll('option')
      .data(options)
      .join('option')
      .attr('value', d => d.value)
      .text(d => d.text)
      .attr('selected', d => d.value == selected ? 'selected' : null);
  };

  for (let func of [
    'id', 'labelText', 'options', 'selected'
  ]) {
    eval(`my.${func} = function (_) {
        return arguments.length ? (
          ${func} = func in [''] ? +_ : _, my
        ) : ${func}
      }
    `);  
  }

  my.on = function () {
    let value = listners.on.apply(listners, arguments);
    return value === listners ? my : value;
  }

  return my;
}