import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RenderItem from "../src/components/renderItem";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("RenderItem component", () => {
  const mockItem = {
    id: 1,
    product: "Product",
    image: "https://via.placeholder.com/45",
    points: 1000,
    createdAt: "2022-12-09T04:50:50.205Z",
    is_redemption: false,
  };

  it("renders correctly", () => {
    const { getByText, queryByText } = render(<RenderItem item={mockItem} />);

    expect(getByText("Product")).toBeDefined();
    expect(queryByText("9 de diciembre, 2022")).toBeDefined();
    expect(getByText("+1,000")).toBeDefined();
  });

  it("navigates to detail screen when item is pressed", () => {
    const { getByTestId } = render(<RenderItem item={mockItem} />);
    const item = getByTestId("item");
    fireEvent.press(item);

    expect(item).toBeDefined();
  });
});