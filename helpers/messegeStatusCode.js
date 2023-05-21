const messages = {
  emailSentCuccessfully:
    "We Have Send You A VrificAtion Link On Your Email Please Click On Verify To Verify Your Email.",
  emailAlreadyVerified: "Upsss seems like this email is already verified.",
  emailToResetPassword:
    "We Have Send An Email Link To Reset Your Password Click On Reset To Reset Your Password",
  emailVarified: "Your Email Has Been Successfully Varified",
  LoginSuccess:
    "User login SuccessFully",
  


  SlotCreated:
  "Address Slots Have Been Created Successfully"
};

const response_status = {
  success: 1,
  failure: 0,
};
const statusCode = {
  ok: 200,
  bad_request: 400,
  internal_server_error: 500,
};

export  { messages, response_status, statusCode };