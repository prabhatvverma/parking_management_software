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
    "Address Slots Have Been Created Successfully",
  NoAddress:
    "This User Does Not Have Any Address Right Now",
  AllAddress:
    "All The Address Are Here",
  SelectedAddressActive:
    "User's Selected Address Is Now Active",
  alredyActiveAddress:
    "Your Address Is Already Active Welcome Back To Selected Address",


  vhicleInfoSaved:
    "Vehicle Details Have Been Saved Successfully",
  parkinFull:
    "Parking Is Full Please try Again After Some Time"


};

const response_status = {
  success: 1,
  failure: 0,
};
const statusCode = {
  ok: 200,
  createdSuccess: 201,
  bad_request: 400,
  no_content: 204,
  internal_server_error: 500,
};

export { messages, response_status, statusCode };