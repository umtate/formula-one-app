export const ToggleSwitch = ({ toggle }) => {
  // This function passes true or false to the toggle prop function depending if the checkbox checked.
  const toggleHandler = (e) => {
    toggle(e.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        className="toggle-switch"
        id="checkbox"
        onChange={toggleHandler}
      ></input>
      <label htmlFor="checkbox" className="toggle-switch-label">
        <div className="toggle-switch-ball"></div>
      </label>
    </div>
  );
};
