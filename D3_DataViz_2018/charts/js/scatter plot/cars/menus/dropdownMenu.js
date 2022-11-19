(() => {
  const dropdownMenu = (selection, props) => {
    const { options , onOptionClicked, selectedOption, id } = props;
    
    const menu = selection
      .append('span')
        .attr('id', id)
      .selectAll('#' + id)
      .data([null])
      .enter();

    let select = menu
      .selectAll('select')
      .data([null]);
    
    select = select
      .enter()
      .append('select')
      .merge(select)
        .on('change', () => {
          onOptionClicked(event.target.value);
        });

    const option = select 
      .selectAll('option')
      .data(options);
    
    option
      .enter()
      .append('option')
      .merge(option)
        .attr('value', d => d.value)
        .property('selected', d => d.value === selectedOption)
        .text(d => d.text);
  }

  globalThis.dropdownMenu = dropdownMenu;
})();