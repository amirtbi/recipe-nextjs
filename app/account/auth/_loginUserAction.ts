"use server";

const loginUserAction = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const createUserResponse = await fetch(
      "http://localhost:3000/api/auth/signIn",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await createUserResponse.json();

    if (!createUserResponse) {
      return { message: data.message || "failed request", success: false };
    }

    return {
      message: "Created Successfully",
      success: true,
      data: data,
    };
  } catch (e) {
    return { message: e, success: false };
  }
};
export default loginUserAction;
