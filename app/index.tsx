import { useCallback, useState } from "react";
import { Button, Text, View } from "react-native";
import { OptimizelyProvider, createInstance  } from "@optimizely/react-sdk";

const optimizelyReactSdkVersion = require("@optimizely/react-sdk/package.json").version;

const optimizely = createInstance({
  sdkKey: process.env.EXPO_PUBLIC_OPTIMIZELY_SDK_KEY,
  odpOptions: {
    disabled: true,
  },
  // These are the defaults but set here to prevent SDK warnings
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

type UserInfo = Parameters<typeof optimizely.setUser>[0];

const myUserInfo: UserInfo = { id: '1', attributes: {} };

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<UserInfo | undefined>(undefined);

  const checkIsReady = useCallback(() => {
    setIsReady(optimizely.isReady());
  }, []);

  const setUserInfo = useCallback(() => {
    setUser(myUserInfo);
  }, []);

  return (
    <OptimizelyProvider optimizely={optimizely} user={user}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginBottom: 30, fontSize: 15 }}>@optimizely/react-sdk {optimizelyReactSdkVersion}</Text>
        <Text>Optimizely Ready: {JSON.stringify(isReady)}</Text>
        <Button title="Re-check" onPress={checkIsReady} />
        <Text>User info: {JSON.stringify(user)}</Text>
        <Button title="Set user info" onPress={setUserInfo} />
      </View>
    </OptimizelyProvider>
  );
}
