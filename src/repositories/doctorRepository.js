import Doctor from "../models/doctor.model.js";

const create = async (data) => Doctor.create(data);

const findById = async (id) => Doctor.findById(id).lean();

const list = async ({ filter = {}, limit = 10, cursor }) => {

  const query = { ...filter };
  if (cursor) {
    const { createdAt, _id } = JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
    query.$or = [
      { createdAt: { $lt: new Date(createdAt) } },
      { createdAt: new Date(createdAt), _id: { $lt: _id } },
    ];
  }

  const docs = await Doctor.find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit + 1)
    .lean();

  let nextCursor = null;
  if (docs.length > limit) {
    const last = docs[limit - 1];
    nextCursor = Buffer.from(JSON.stringify({ createdAt: last.createdAt, _id: last._id })).toString("base64");
    docs.splice(limit);
  }

  return { docs, nextCursor };
};

const update = async (id, data) =>
  Doctor.findByIdAndUpdate(id, data, { new: true }).lean();

const remove = async (id) => Doctor.findByIdAndDelete(id).lean();

export default { create, findById, list, update, remove };
