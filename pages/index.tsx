import type { NextPage } from "next";
import { Layout } from "../components/layout/layout";
import Main from "../components/main/main";
import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import { Blogs } from "../interfaces/blogs";
// @ts-ignore
import gitBlame from "git-blame";

const Home: NextPage<{ blogs: Blogs[] }> = (props) => {
  return (
    <Layout title="Blog" description="Novu blog page">
      <Main blogs={props.blogs} />
    </Layout>
  );
};

export async function getStaticProps() {
  const files = readdirSync(path.resolve(process.cwd(), "blogs"), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      name: dirent.name,
      time: statSync(
        path.resolve(process.cwd(), "blogs", dirent.name)
      ).mtime.getTime(),
    }))
    .sort(function (a, b) {
      return b.time - a.time;
    });

  const loadAllBlogs = files.map((p) => ({
    path: p.name,
    ...JSON.parse(
      readFileSync(
        path.resolve(process.cwd(), "blogs", p.name, "config.json")
      ).toString()
    ),
  }));

  return { props: { blogs: loadAllBlogs } };
}

export default Home;
