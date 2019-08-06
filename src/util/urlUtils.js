export const urls = {
  home: { name: "Home", path: "/" },
  list: { name: "List", path: "/list" },
  add: { name: "Add", path: "/add" },
  login: { name: "Login", path: "/login" },
  newaccount: { name: "NewAccount", path: "/newaccount" }
};

export const privateUrls = {
  edit: {
    name: "edit",
    path: "/edit/:id",
    pathWithoutParam: "/edit/"
  }
};
