import { jwtDecode as decode } from "jwt-decode";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export const extractUserDetails = () => {
  const token = localStorage.getItem("authToken");

  return token ? decode(token as string) : null;
};

export const sanitizeStringArray = (arr: string[]) => {
  return arr.filter(function (value) {
    return value.trim() !== "";
  });
};

export const createAvatarStyle = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
