import * as Contacts from "expo-contacts";
import { getFormattedPhoneNumber } from "../../../utils/helpers";
import { GET_USER_BY_PHONE } from "./queries";
import { createUser } from ".";
import Connection from "../../connection";

const IsAlreadyExistsInDatabase = async (phone) => {
  try {
    const db = await Connection.getConnection();
    const result = db.getFirstAsync(GET_USER_BY_PHONE, [phone]);
    console.log("IsAlreadyExistsInDatabase", result);
    return result;
  } catch (error) {
    console.log("Error while IsAlreadyExistsInDatabase: ", error);
    throw error;
  }
};

const getContactDetailsById = async (id) => {
  try {
    const contact = await Contacts.getContactByIdAsync(id, [
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Name,
    ]);

    if ((!contact && !contact.Name) || contact.phoneNumbers.length < 0) {
      return null;
    }
    return {
      name: contact.name,
      phone: getFormattedPhoneNumber(contact.phoneNumbers[0].number),
    };
  } catch (error) {
    console.log(
      "Error while getting contact from getContactDetailsById",
      error
    );
    throw error;
  }
};

export const registerUserUnofficial = async (contactIds) => {
  let userIds = [];
  for (const contactId of contactIds) {
    const contact = await getContactDetailsById(contactId);
    if (!contact) {
      return;
    }
    let user = await IsAlreadyExistsInDatabase(contact.phone);

    if (user) {
      console.log("User already exists ");
    } else {
      user = await createUser(contact.name, null, contact.phone, contact.phone, 0);
      console.log("user created", user.id);
    }
    userIds.push(user.id);
  }
  return userIds;
};
