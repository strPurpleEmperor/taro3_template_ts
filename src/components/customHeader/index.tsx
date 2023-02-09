import React, { useContext } from "react";
import { View } from "@tarojs/components";
import { globalContext } from "@/context/global";

interface Props {
  head?: React.ReactNode;
  headClassName?: string;
  subhead?: React.ReactNode;
  subHeadClassName?: string;
  className?: string;
  bottom?: React.ReactNode;
}
function CustomHeader(props: Props) {
  const { statusBarHeight, navHeight } = useContext(globalContext);
  const { head, headClassName, subhead, subHeadClassName, className, bottom } =
    props;
  const headHeight = statusBarHeight + "px";
  const subHeight = navHeight + "px";
  return (
    <View className={className}>
      <View
        className={headClassName}
        style={{ height: headHeight, lineHeight: subHeight }}
      >
        {head}
      </View>
      <View
        className={subHeadClassName}
        style={{ height: subHeight, lineHeight: subHeight }}
      >
        {subhead}
      </View>
      {bottom}
    </View>
  );
}
export default CustomHeader;
