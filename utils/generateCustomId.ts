import { Model } from 'mongoose';

/**
 * Generate new custom ID for a model with a prefix.
 * 
 * @param model - Mongoose model instance
 * @param prefix - string prefix like 'emp', 'adm', 'job', 'rec'
 * @param idField - the field name in DB where ID is stored, default 'customId'
 * @returns new generated id string like 'emp101', 'emp102' etc.
 */
async function generateCustomId(
  model: Model<any>,
  prefix: string,
  idField: string = 'customId'
): Promise<string> {
  // Find the latest document whose ID starts with prefix, sorted descending by numeric suffix
  const lastDoc = await model.findOne({
    [idField]: { $regex: `^${prefix}\\d+$` }
  })
  .sort({ [idField]: -1 }) // sort descending by idField lex order
  .exec();

  if (!lastDoc) {
    // No records exist yet
    return `${prefix}101`;
  }

  const lastId: string = lastDoc[idField]; // e.g. emp105

  // Extract numeric part
  const numericPart = lastId.replace(prefix, '');
  const number = parseInt(numericPart, 10);

  if (isNaN(number)) {
    // fallback in case of bad format
    return `${prefix}101`;
  }

  // Increment numeric part by 1
  const newNumber = number + 1;

  return `${prefix}${newNumber}`;
}
