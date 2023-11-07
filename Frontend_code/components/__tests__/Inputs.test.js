import { render, fireEvent } from "@testing-library/react";
import * as LoginForm from "../signups/Loginform";

it("InputRenderCheck", () => {
    const { getByTestId } = render(<LoginForm />);
    const input1 = getByTestId("EmailInput");
    expect(input1).toBeTruthy();
});

describe("ChangeInInput", () => {
    it("onClick", () => {
        const { getByTestId } = render(<LoginForm />);
        const input2 = getByTestId("EmailInput");
        fireEvent.change(input2);
    })
});