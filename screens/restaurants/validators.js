export const validateName = (name) => {
  if (!name.trim()) {
    return "Restaurant name is required";
  }
  if (name.length < 2) {
    return "Restaurant name must be at least 2 characters";
  }
  if (!/^[a-zA-Z0-9\s,'-]*$/.test(name)) {
    return "Restaurant name contains invalid characters";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone)) {
    return "Phone number contains invalid characters";
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return "Phone number must have at least 7 digits";
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address.trim()) {
    return "Address is required";
  }
  if (address.length < 5) {
    return "Address must be at least 5 characters";
  }
  return null;
};

export const validateWebsite = (website) => {
  if (!website.trim()) {
    return "Website is required";
  }
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  if (!urlRegex.test(website)) {
    return "Please enter a valid website URL";
  }
  return null;
};
