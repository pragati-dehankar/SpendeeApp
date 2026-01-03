import * as Contacts from "expo-contacts";
import { getFormattedPhoneNumber } from "../../../utils/helpers";
import { GET_USER_BY_PHONE } from "./queries";
import { createUser } from ".";
import Connection from "../../connection";

/* ✅ MUST await DB call */
const IsAlreadyExistsInDatabase = async (phone) => {
  try {
    const db = await Connection.getConnection();
    const result = await db.getFirstAsync(GET_USER_BY_PHONE, [phone]);
    return result ?? null;
  } catch (error) {
    console.log("Error while IsAlreadyExistsInDatabase:", error);
    throw error;
  }
};

const getContactDetailsById = async (id) => {
  try {
    const contact = await Contacts.getContactByIdAsync(id, [
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Name,
    ]);

    // ✅ SAFE checks
    if (
      !contact ||
      !contact.phoneNumbers ||
      contact.phoneNumbers.length === 0
    ) {
      console.log("Skipping invalid contact:", id);
      return null;
    }

    return {
      name: contact.name ?? "Unknown",
      phone: getFormattedPhoneNumber(contact.phoneNumbers[0].number),
    };
  } catch (error) {
    console.log("Error in getContactDetailsById:", error);
    return null; // ✅ DO NOT crash
  }
};

export const registerUserUnofficial = async (contactIds) => {
  const userIds = [];

  for (const contactId of contactIds) {
    const contact = await getContactDetailsById(contactId);

    if (!contact) continue; // ✅ skip, don't return

    let user = await IsAlreadyExistsInDatabase(contact.phone);

    if (!user) {
      user = await createUser(
        contact.name,
        null,
        contact.phone,
        contact.phone,
        0
      );
      console.log("User created:", user?.id);
    } else {
      console.log("User already exists:", user.id);
    }

    if (user?.id) {
      userIds.push(user.id);
    }
  }

  return userIds;
};
