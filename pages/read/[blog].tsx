import type { NextPage } from "next";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { Blogs } from "../../interfaces/blogs";
import { Blog } from "../../components/blog/blog";
import {Layout} from "../../components/layout/layout";
import { loadDirectories } from "../../helpers/load.directories";

const Read: NextPage<{ blog: Blogs }> = (props) => {
  const { blog } = props;
  if (blog?.pageNotFound!) {
    return <Layout title="page not found" description="page not found">Page Not Found</Layout>;
  }
  return <Blog blog={blog} />;
};

export async function getStaticPaths() {
  const dirs = loadDirectories();
  return {
    paths: dirs.map(d => ({ params: { blog: d.name } })),
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(props: any) {
  const file = path.resolve(process.cwd(), "public", "blogs", props.params.blog);
  try {
    const mdx = readFileSync(path.resolve(file, "blog.md")).toString();
    return {
      props: {
        blog: {
          mdx,
          path: props.params.blog,
          ...JSON.parse(
            readFileSync(path.resolve(file, "config.json")).toString()
          ),
        },
      },
    };
  } catch (err) {
    return {
      props: {
        blog: {
          pageNotFound: true,
        },
      },
    };
  }
}

export default Read;
