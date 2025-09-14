import Joi from 'joi';

export const nameSchema = Joi.string().min(20).max(60).required();
export const emailSchema = Joi.string().email().max(100).required();
export const addressSchema = Joi.string().allow('', null).max(400);
export const passwordSchema = Joi.string()
	.min(8)
	.max(16)
	.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/)
	.required();

export const roleSchema = Joi.string().valid('admin', 'user', 'owner').required();
export const ratingSchema = Joi.number().integer().min(1).max(5).required();

export const signupSchema = Joi.object({
	name: nameSchema,
	email: emailSchema,
	address: addressSchema,
	password: passwordSchema,
});

export const addUserSchema = Joi.object({
	name: nameSchema,
	email: emailSchema,
	address: addressSchema,
	password: passwordSchema,
	role: roleSchema,
});

export const loginSchema = Joi.object({
	email: emailSchema,
	password: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
	oldPassword: Joi.string().required(),
	newPassword: passwordSchema,
});

export const addStoreSchema = Joi.object({
	name: Joi.string().min(1).max(100).required(),
	email: Joi.string().email().max(100).allow(null, ''),
	address: addressSchema,
	ownerId: Joi.number().integer().allow(null),
});

export const rateSchema = Joi.object({
	storeId: Joi.number().integer().required(),
	rating: ratingSchema,
});
