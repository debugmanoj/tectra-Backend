import doctorRepo from "../repositories/doctorRepository.js";

export const getDoctors = async (query) => {

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.specialty) filter.specialty = query.specialty;
  if (query.search) filter.$text = { $search: query.search };

  const limit = Math.min(parseInt(query.limit || 10), 50);
  const { docs, nextCursor } = await doctorRepo.list({
    filter,
    limit,
    cursor: query.cursor,
  });

  return { items: docs, nextCursor };
};

export const createDoctor = async (body) => doctorRepo.create(body);

export const updateDoctor = async (id, body) => doctorRepo.update(id, body);

export const deleteDoctor = async (id) => doctorRepo.remove(id);
