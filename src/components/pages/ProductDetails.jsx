import React from 'react'
import { useParams } from 'react-router-dom'
import { data } from '../../../data'
import { Icon } from '../ui/Icon/Icon'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Alert } from '../ui/Alert/Alert'
import { useDisclosure } from '../hooks/useDisclosure'

export const ProductDetails = () => {
    // Получение id товара из адресной строки
    const params = useParams()

    // Поиск товара по id в бд
    const product = data?.find((item) => item?.id === params?.id)

    // Логика добавления товара в корзину (контекст)
    const { addToCart } = useCart()

    // Локальное состояние для показа/скрытия уведомления
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="bg-white max-w-7xl mx-auto px-2">
          <div>
            <Link
              to="/products"
              className="inline-flex items-center text-sm text-indigo-600 py-3 gap-1"
            >
              <Icon 
                name="chevron-left" 
                className="fill-indigo-600"
                 />
              Back to products
            </Link>
    
            <div className="mx-auto mt-6 max-w-2xl flex lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 ">
              <div className="relative min-w-[330px] max-h-[350px]">
                <img
                  src={product?.imgSrc}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="size-full rounded-lg object-cover lg:block min-h-80 bg-slate-300"
                />
                <button
                  className='absolute top-[7px] left-[7px] text-white'
                >
                  <Icon name="favorite" />
                </button>
            </div>
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-800 sm:text-3xl">
                    {product?.name}
                  </h1>
                </div>
    
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-zinc-800">
                    ${product?.price}
                  </p>
    
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-end">
                      {product?.rating && (
                        <p className="text-3xl tracking-tight text-zinc-800 flex items-end gap-2">
                          {product?.rating}
                          {Array.from({ length: Math.min(Math.floor(product?.rating), 5) }, (_, i) => (
                            <Icon
                              name="star"
                              key={i}
                              className="fill-yellow-500 stroke-yellow-500"
                            />
                          ))}
                        </p>
                        )}
                      <a
                        href="#"
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        117 reviews
                      </a>
                    </div>
                  </div>
                  <form className="mt-10">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-800">Color</h3>
    
                      <fieldset aria-label="Choose a color" className="mt-4">
                        <div className="flex items-center gap-x-3">
                          <label
                            aria-label="White"
                            className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-hidden"
                          >
                            <input
                              type="radio"
                              name="color-choice"
                              value="White"
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className="size-8 rounded-full border border-black/10 bg-white"
                            ></span>
                          </label>
                          <label
                            aria-label="Gray"
                            className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-hidden"
                          >
                            <input
                              type="radio"
                              name="color-choice"
                              value="Gray"
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className="size-8 rounded-full border border-black/10 bg-gray-200"
                            ></span>
                          </label>
                          <label
                            aria-label="Black"
                            className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-hidden"
                          >
                            <input
                              type="radio"
                              name="color-choice"
                              value="Black"
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className="size-8 rounded-full border border-black/10 bg-gray-900"
                            ></span>
                          </label>
                        </div>
                      </fieldset>
                    </div>
    
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-zinc-800">Size</h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </div>
    
                      <fieldset aria-label="Choose a size" className="mt-4">
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          <label className="group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50  text-sm font-medium text-gray-200 uppercase hover:bg-gray-50 focus:outline-hidden ">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XXS"
                              disabled
                              className="sr-only"
                            />
                            <span>XXS</span>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line
                                  x1="0"
                                  y1="100"
                                  x2="100"
                                  y2="0"
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XS"
                              className="sr-only"
                            />
                            <span>XS</span>
    
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="S"
                              className="sr-only"
                            />
                            <span>S</span>
    
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="M"
                              className="sr-only"
                            />
                            <span>M</span>
    
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="L"
                              className="sr-only"
                            />
                            <span>L</span>
    
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="XL"
                              className="sr-only"
                            />
                            <span>XL</span>
    
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="2XL"
                              className="sr-only"
                            />
                            <span>2XL</span>
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                          <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium text-zinc-800 uppercase shadow-xs hover:bg-gray-50 focus:outline-hidden sm:flex-1 sm:py-6">
                            <input
                              type="radio"
                              name="size-choice"
                              value="3XL"
                              className="sr-only"
                            />
                            <span>3XL</span>
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>
                        </div>
                      </fieldset>
                    </div>
                    
                    <button
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium cursor-pointer text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      onClick={() => {
                        addToCart(product)
                        onOpen()
                      }}
                      type="button"
                    >
                      Add to basket
                    </button>
                  </form>
                </div>
    
                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                  <div>
                    <h3 className="sr-only">Description</h3>
    
                    <div className="space-y-6">
                      <p className="text-base text-zinc-800">
                        The Basic Tee 6-Pack allows you to fully express your
                        vibrant personality with three grayscale options. Feeling
                        adventurous? Put on a heather gray tee. Want to be a
                        trendsetter? Try our exclusive colorway: &quot;Black&quot;.
                        Need to add an extra pop of color to your outfit? Our white
                        tee has you covered.
                      </p>
                    </div>
                  </div>
    
                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-zinc-800">
                      Highlights
                    </h3>
    
                    <div className="mt-4">
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Hand cut and sewn locally
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Dyed with our proprietary colors
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Pre-washed &amp; pre-shrunk
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Ultra-soft 100% cotton
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
    
                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-zinc-800">Details</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        The 6-Pack includes two black, two white, and two heather
                        gray Basic Tees. Sign up for our subscription service and be
                        the first to get new, exciting colors, like our upcoming
                        &quot;Charcoal Gray&quot; limited release.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Alert
            title="Действия добавления товара в корзину"
            subtitle="Товар успешно добавлен в корзину"
            variant="success"
            isOpen={isOpen}
            onClose={onClose}
          />
        </div>
      );
}