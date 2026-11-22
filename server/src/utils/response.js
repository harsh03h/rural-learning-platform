export function success(res, data = {}, message = null, statusCode = 200) {
  const payload = { success: true, ...data };
  if (message) payload.message = message;
  return res.status(statusCode).json(payload);
}

export function created(res, data = {}, message = 'Created successfully') {
  return success(res, data, message, 201);
}

export function noContent(res) {
  return res.status(204).send();
}

export function paginate(query = {}, options = {}) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sort: options.sort || { createdAt: -1 },
  };
}

export function paginationMeta(page, limit, total) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
}
