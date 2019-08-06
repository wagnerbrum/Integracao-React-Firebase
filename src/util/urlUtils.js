export const urls = {
  home: { name: "Home", path: "/" },
  list: { name: "List", path: "/list" },
  add: { name: "Add", path: "/add" }
};

export const privateUrls = {
  edit: {
    name: "edit",
    path: "/edit/:id",
    pathWithoutParam: "/edit/"
  }
};
