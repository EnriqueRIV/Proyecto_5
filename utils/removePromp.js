export const removePromp = (id) => {
  if (document.getElementById(id)) {
    document.getElementById(id).remove();
  }
};
