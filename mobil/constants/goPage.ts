import { CommonActions } from "@react-navigation/native";

export function goPage(
  navigation: any,
  pageName: any,
  params: any = {},
  back = true
) {
  // Do u wanna set there is back for page?
  if (back) {
    navigation.navigate(pageName, params);
  } else {
    let toPage = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: pageName,
          params: params,
        },
      ],
    });
    navigation.dispatch(toPage);
  }
}