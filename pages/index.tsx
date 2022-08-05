import type { NextPage } from "next";

type PageProps = {
  sayText: string;
};

const Origin: NextPage<PageProps> = ({ sayText }) => {
  return (
    <div className="min-h-screen px-8 md:px-0 bg-black flex pt-32 md:pt-0 md:items-center justify-center">
      <p className="text-white text-3xl lg:text-5xl">{sayText}</p>
    </div>
  );
};

export default Origin;
export const getServerSideProps = async () => {
  try {
    const sayText = await fetch(process.env.APP_URL_ORIGIN + "/say.txt").then(
      (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.text();
      }
    );
    const says = sayText.split("\n");
		if (says[says.length - 1] === "") {
			says.pop();
		}
    const say = says[Math.floor(Math.random() * says.length)];
    return { props: { sayText: say } };
  } catch (e) {
    console.error(e);
    return {
      props: {
        sayText: "Anyone can make mistakes, there are too many variables.",
      },
    };
  }
};
