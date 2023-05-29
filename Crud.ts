interface Element {
  id: number,
}

export function add<T extends Element>(array: T[], callback: (newArray: T[]) => void, newItem: T) {
  if (array.length > 0) {
    newItem.id = array[array.length - 1].id + 1;
  } else {
    newItem.id = 0;
  }
  callback([...array, newItem]);
}

export function modify<T extends Element>(array: T[], callback: (newArray: T[]) => void, modifiedItem: T) {
  const index = array.findIndex((i) => i.id == modifiedItem.id);
  array[index] = modifiedItem;
  callback([...array]);
}

export function remove<T extends Element>(array: T[], callback: (newArray: T[]) => void, deletedItem: T) {
  const filteredArray = array.filter(i => i.id != deletedItem.id);
  callback([...filteredArray]);
}
