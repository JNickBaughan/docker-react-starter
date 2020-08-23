type Props = {
  text: string;
  times: number;
};

const message = ({ text, times }: Props): void => {
  for (let i = 0; i < times; i++) {
    console.log(text);
  }
};

message({
  text: "hello world",
  times: 2,
});
