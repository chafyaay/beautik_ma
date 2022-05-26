export const PRODUCTS: {
  id: number;
  brandName: string;
  title: string;
  desc: string;
  price: number;
  discountedPrice: number;
  cover: string;
  imagesUrls: string[];
  comments: {
    userNname: string;
    comment: string;
    dateComment: Date;
    rating: number;
  }[];
  rating: number;
  stock: number;
}[] = [
  {
    id: 1,
    brandName: "California Gold Nutrition",
    title: "FOODS, Oignon biologique en poudre, 496 g",
    desc: `
    <div class="col-xs-24">

                                                <h3>
                                                    <strong>Description</strong>
                                                </h3>
                                                <div itemprop="description"><ul><li>Soutien neurologique</li><li>À la grande camomille</li><li>Favorise un flux sanguin sain vers le cerveau</li><li>Sans OGM</li><li>Complément alimentaire</li><li>Végétarien/Vegan</li><li>Plantes/Herbes</li><li>Entreprise familiale depuis 1968</li><li>Qualité BPF garantie</li></ul><p>Les herboristes européens utilisent le pétasite depuis des décennies. Par ailleurs, des études scientifiques ont démontré que les pétasines, les constituants actifs du pétasite, peuvent favoriser un flux sanguin sain vers le cerveau et une fonction neurologique normale. Ainsi, le pétasite peut participer au maintien du confort de la tête chez les personnes en bonne santé. Le pétasite de NOW<sup>®</sup> est également exempt d'alcaloïdes de pyrrolizidine (AP) indésirables et peut donc s'utiliser régulièrement.</p></div>
                                            </div>`,
    price: 100,
    discountedPrice: 90,
    cover:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now04602/v/9.jpg",
    imagesUrls: [
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now04602/l/14.jpg",
    ],
    comments: [
      {
        userNname: "youssef",
        comment: "good",
        dateComment: new Date(),
        rating: 5,
      },
    ],
    rating: 3.7,
    stock: 20,
  },
  {
    id: 2,
    brandName: "Deep Steep,",
    title:
      " Nettoyant moussant pour les mains à la noix de coco, à l'argan et au karité, au pamplemousse et à la bergamote, 237 ml    ",
    desc: `
    <div class="col-xs-24">

                                                <h3>
                                                    <strong>Description</strong>
                                                </h3>
                                                <div itemprop="description"><ul><li>Soutien neurologique</li><li>À la grande camomille</li><li>Favorise un flux sanguin sain vers le cerveau</li><li>Sans OGM</li><li>Complément alimentaire</li><li>Végétarien/Vegan</li><li>Plantes/Herbes</li><li>Entreprise familiale depuis 1968</li><li>Qualité BPF garantie</li></ul><p>Les herboristes européens utilisent le pétasite depuis des décennies. Par ailleurs, des études scientifiques ont démontré que les pétasines, les constituants actifs du pétasite, peuvent favoriser un flux sanguin sain vers le cerveau et une fonction neurologique normale. Ainsi, le pétasite peut participer au maintien du confort de la tête chez les personnes en bonne santé. Le pétasite de NOW<sup>®</sup> est également exempt d'alcaloïdes de pyrrolizidine (AP) indésirables et peut donc s'utiliser régulièrement.</p></div>
                                            </div>`,
    price: 80,
    discountedPrice: 50,
    cover:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/dee/dee10016/l/14.jpg",
    imagesUrls: [
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/dee/dee10016/l/15.jpg",
    ],
    comments: [
      {
        userNname: "youssef",
        comment: "good",
        dateComment: new Date(),
        rating: 5,
      },
    ],
    rating: 5,
    stock: 21,
  },
  {
    id: 3,
    brandName: "Charlie & Frank, ",
    title:
      "Omégas avancés pour les hanches et les articulations des animaux, Chiens et chats, 120 tendres friandises à mâcher",
    desc: `
    <div class="col-xs-24">

                                                <h3>
                                                    <strong>Description</strong>
                                                </h3>
                                                <div itemprop="description"><ul><li>Soutien neurologique</li><li>À la grande camomille</li><li>Favorise un flux sanguin sain vers le cerveau</li><li>Sans OGM</li><li>Complément alimentaire</li><li>Végétarien/Vegan</li><li>Plantes/Herbes</li><li>Entreprise familiale depuis 1968</li><li>Qualité BPF garantie</li></ul><p>Les herboristes européens utilisent le pétasite depuis des décennies. Par ailleurs, des études scientifiques ont démontré que les pétasines, les constituants actifs du pétasite, peuvent favoriser un flux sanguin sain vers le cerveau et une fonction neurologique normale. Ainsi, le pétasite peut participer au maintien du confort de la tête chez les personnes en bonne santé. Le pétasite de NOW<sup>®</sup> est également exempt d'alcaloïdes de pyrrolizidine (AP) indésirables et peut donc s'utiliser régulièrement.</p></div>
                                            </div>`,
    price: 100,
    discountedPrice: 90,
    cover:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cfa/cfa01496/v/35.jpg",
    imagesUrls: [
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cfa/cfa01496/l/38.jpg",
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cfa/cfa01496/l/10.jpg",
    ],
    comments: [
      {
        userNname: "youssef",
        comment: "good",
        dateComment: new Date(),
        rating: 5,
      },
    ],
    rating: 3,
    stock: 20,
  },
  {
    id: 4,
    brandName: "Thorne Research,",
    title: " MediClear Plus, 27.2 oz (772 g)    ",
    desc: `
    <div class="col-xs-24">

                                                <h3>
                                                    <strong>Description</strong>
                                                </h3>
                                                <div itemprop="description"><ul><li>Soutien neurologique</li><li>À la grande camomille</li><li>Favorise un flux sanguin sain vers le cerveau</li><li>Sans OGM</li><li>Complément alimentaire</li><li>Végétarien/Vegan</li><li>Plantes/Herbes</li><li>Entreprise familiale depuis 1968</li><li>Qualité BPF garantie</li></ul><p>Les herboristes européens utilisent le pétasite depuis des décennies. Par ailleurs, des études scientifiques ont démontré que les pétasines, les constituants actifs du pétasite, peuvent favoriser un flux sanguin sain vers le cerveau et une fonction neurologique normale. Ainsi, le pétasite peut participer au maintien du confort de la tête chez les personnes en bonne santé. Le pétasite de NOW<sup>®</sup> est également exempt d'alcaloïdes de pyrrolizidine (AP) indésirables et peut donc s'utiliser régulièrement.</p></div>
                                            </div>`,
    price: 89,
    discountedPrice: 77,
    cover:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mli/mli00952/v/199.jpg",
    imagesUrls: [
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/mli/mli00952/v/200.jpg",
    ],
    comments: [
      {
        userNname: "youssef",
        comment: "good",
        dateComment: new Date(),
        rating: 5,
      },
    ],
    rating: 2.7,
    stock: 20,
  },
  {
    id: 5,
    brandName: "Avalon Organics,",
    title: " Shampoing, Volume, Romarin, 325 ml    ",
    desc: `
    <div class="col-xs-24">

                                                <h3>
                                                    <strong>Description</strong>
                                                </h3>
                                                <div itemprop="description"><ul><li>Soutien neurologique</li><li>À la grande camomille</li><li>Favorise un flux sanguin sain vers le cerveau</li><li>Sans OGM</li><li>Complément alimentaire</li><li>Végétarien/Vegan</li><li>Plantes/Herbes</li><li>Entreprise familiale depuis 1968</li><li>Qualité BPF garantie</li></ul><p>Les herboristes européens utilisent le pétasite depuis des décennies. Par ailleurs, des études scientifiques ont démontré que les pétasines, les constituants actifs du pétasite, peuvent favoriser un flux sanguin sain vers le cerveau et une fonction neurologique normale. Ainsi, le pétasite peut participer au maintien du confort de la tête chez les personnes en bonne santé. Le pétasite de NOW<sup>®</sup> est également exempt d'alcaloïdes de pyrrolizidine (AP) indésirables et peut donc s'utiliser régulièrement.</p></div>
                                            </div>`,
    price: 100,
    discountedPrice: 90,
    cover:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ava/ava35110/l/8.jpg",
    imagesUrls: [
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ava/ava35110/l/9.jpg",
    ],
    comments: [
      {
        userNname: "youssef",
        comment: "good",
        dateComment: new Date(),
        rating: 5,
      },
    ],
    rating: 1.7,
    stock: 20,
  },
];
