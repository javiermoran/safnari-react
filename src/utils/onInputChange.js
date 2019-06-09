const onInputChange = (e, component) => {
  const name = e.target.name;
  const state = { ...component.state };
  state[name] = e.target.value;
  component.setState(state);
}

export default onInputChange;
