"use server";

const createUserAction = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  const createUserResponse = await fetch(
    "http://localhost:3000/api/auth/signUp",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone }),
    }
  );

  const data = await createUserResponse.json();

  if (!createUserResponse || !createUserResponse.ok) {
    return { message: data.message || "failed request", success: false };
  }

  return {
    message: "Created Successfully",
    success: true,
    data: data,
  };
};
export default createUserAction;
