import { readdirSync, statSync } from "fs";
import path from "path";


export const loadDirectories = () => {
  return readdirSync(path.resolve(process.cwd(), "public", "blogs"), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      name: dirent.name,
      time: statSync(
        path.resolve(process.cwd(), "public", "blogs", dirent.name)
      ).mtime.getTime(),
    }))
    .sort(function (a, b) {
      return b.time - a.time;
    });
}