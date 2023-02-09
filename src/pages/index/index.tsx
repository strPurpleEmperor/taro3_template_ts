import React from "react";
import { FC } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";
import { BASE_COLOR } from "@/global/const";

const Index: FC = () => {
  return (
    <View className='index' style={{ color: BASE_COLOR }}>
      hello world
    </View>
  );
};
export default Index;
