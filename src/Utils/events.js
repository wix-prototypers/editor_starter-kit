export const Events = (component, newEvent) => {
  const events = {
    mount: new Event(component + "-mount"),
    update: new Event(component + "-update"),
    destroy: new Event("destroy"),
  };
  return events;
};
