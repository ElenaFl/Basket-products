import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

/**
 * Компонент форма.
 * @param {string} type - Тип формы (логин/регистрация).
 */
export const Form = ({ type, onSubmit }) => {
    // состояние для обработки формы
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"})

    console.log('errors', errors)

    const onSubmitForm = async (data) => {
        console.log(data);
        await onSubmit(data);
    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmitForm)}>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                    type="email"
                    name="email"
                    {...register("email", { 
                        required: "Email is required", 
                        pattern: { 
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                            message: "Please enter a valid email address" 
                        }
                    })} 
                    id="email" 
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" placeholder="name@flowbite.com" 
                />
                {errors.email && <span className="text-red-500">{errors?.email?.message}</span>}
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input 
                    type="password" 
                    name="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters long' }
                    })}
                    id="password" 
                    placeholder="Password"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 dark:shadow-xs-light" 
                    required 
                />
                {errors.password && <span className="text-red-500">{errors?.password?.message}</span>}
            </div>
            {type === 'register' && (
                <div className="mb-5 flex items-baseline gap-2">
                    <input 
                        id="isAgree" 
                        type="checkbox" 
                        name="isAgree"
                        {...register('isAgree')}
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                        required 
                    />
                    <label htmlFor="isAgree" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">I agree with the terms and conditions</label>
                    {errors.isAgree && <span className="text-red-500">{errors?.isAgree?.message}</span>}
                </div>
            )}
            <button className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
        </form>
    )
}