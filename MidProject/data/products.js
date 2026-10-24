
const products = [
  {
    id: '1',
    name: 'Signature Perfume',
    price: 1500,
    category: 'Makeup',
    gender: 'Female',
    subcategory: 'Perfumes',
    image:
      'https://images.openai.com/static-rsc-4/3nWQoXki0rTurypSqhIWRX1hJMUpjtnlcV1LsflF9C_BseZq66bhSnrkcx8dLI5w4GWlyeBHcr0PYScllSEjx7r6tehUbLm3L2G1P7b7MiJuDslf0KjuR0nC9dtnOuoqVZ4YPR4gkfZotXQPbKrTYhMy2ISLxmu2HUN9a6rE8GdSJIjLMpjpNyZnFKvVJVbx?purpose=fullsize',
    description:
      'A sophisticated fragrance for everyday elegance.',
  },

  {
    id: '2',
    name: 'Classic Watch',
    price: 2200,
    category: 'Accessories',
    gender: 'Male',
    subcategory: 'Watches',
    image:
      'https://images.openai.com/static-rsc-4/nK4yVVqMl8qWoSRMvDwN369tsz8uog43J4gvuME568MO0HpjTfTDlhlldRVn67_stK73aN6N5797Z4AdzWV0-jmOAmRW81rTpjq25LkSJmFa86ZP58il_0a71Uo4DfEX6dymXvi3iQKko2ZaHWIhDEi0aGuUB1qbbbWYa84xK5o?purpose=inline',
    description:
      'A timeless watch for a polished look.',
  },

  {
    id: '3',
    name: 'Elegant Handbag',
    price: 1800,
    category: 'Accessories',
    gender: 'Female',
    subcategory: 'Purses',
    image:
      'https://images.openai.com/static-rsc-4/Cvy2v6XMYK3286rxmVw46gexz5X5kqza-iqRkJ2AMB4Tr7aeNGV3HqK3D0t97ZAyCAcMyDu1PJ9PAPa7YBPB6TxF1WxVAQI0KjkDXm1XLbi_EodXVe8Ph0KVeZ210PF0aOiwHDe7rxpmX2SS6KMaHWAnleRvfukK3BxQvCTnsGLWh1sMa9ydGc-xDG08Vu-e?purpose=fullsize',
    description:
      'A versatile handbag for daily use.',
  },

  {
    id: '4',
    name: 'Casual Outfit',
    price: 2500,
    category: 'Clothes',
    gender: 'Male',
    subcategory: 'Stitched',
    image:
      'https://images.openai.com/static-rsc-4/HDNt_POppCITL0yBUc2U8Rd2Zix8LY3zfikVU8vqYgnljvneaYSqzk9Ut8uvG-Tw8JogLgOr2FxW5bfISt48tIzzmyNaOjEc9vA6yx0SvDB2kvkEjDcDMEAdjfw0MCGlA_qpkZubB0ciB6EXu4HO9j4MFQKRr5ut-Br4LC6iR_1oIQPofXmBKRhd2TInrMxV?purpose=fullsize',
    description:
      'A comfortable style for everyday wear.',
  },

  {
    id: '5',
    name: 'Classic Wallet',
    price: 950,
    category: 'Accessories',
    gender: 'Male',
    subcategory: 'Purses/Wallets',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600',
    description:
      'A practical wallet for carrying everyday essentials.',
  },

  {
    id: '6',
    name: 'Elegant Bracelet',
    price: 1200,
    category: 'Accessories',
    gender: 'Female',
    subcategory: 'Jewellery',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600',
    description:
      'A delicate bracelet to complement your style.',
  },
{
    id: '7',
    name: 'Stitched Fabric',
    price: 3000,
    category: 'Clothes',
    gender: 'Male',
    subcategory: 'Stitched',
    image:
      'https://images.openai.com/static-rsc-4/S5D6_wYmBeXwpWqijJTISOg1wYyGkk3letdNhAD_STHa5L7ep_ukIOORtlLPFGfQr7X4zDb__FYHhBHJmYmSFivA7wctFAWU47Zy24qfBVli87yhDs-hhTntnknsh52NPEZVMEfk6Ev6L7Iqxm03pYPmpFgIV1peuQjMKOuE0PSnOEQAaFtzzhkhEORv1rFv?purpose=fullsize',
    description:
      'Fabric for creating your own preferred outfit.',
  },
  {
    id: '8',
    name: 'Unstitched Fabric',
    price: 3000,
    category: 'Clothes',
    gender: 'Male',
    subcategory: 'Unstitched',
    image:
      'https://images.openai.com/static-rsc-4/H-UQNhgsV9oKiqCBgvBaND-57i-0dDq6Yc5DTwHpcKn8SNYMH8Yuig3fBRtWvf7ovKoRRNQsXL7bHMVrHGLiEbDFcY9QBi71qSqBpHNeufZ1ilXEnDpJEcT4n3SPKEmEujwJbrAaNTCqoMAUAO_6DKUYdctVkZqOA7SUycNmcv_eiEUPvgvOFsaNEgs5_TAk?purpose=fullsize',
    description:
      'Fabric for creating your own preferred outfit.',
  },
{
    id: '9',
    name: 'Unstitched Fabric',
    price: 2000,
    category: 'Clothes',
    gender: 'Female',
    subcategory: 'Unstitched',
    image:
      'https://images.openai.com/static-rsc-4/YKS87NGGd7X-IKMt8UFCW4o9jQcWx73qm8fwePwkfppX8hiODb7u1jNlVlQB2Xx7An1IggUvJSOdx7oLlsNdwvUTb2d7Jc6Ybe1g91O_sEVofr1qwHqreEN0ezw5ib3-fxf9ibdxP5Rx-cAormuwRCWDNye_M7O3U8cEgzmJBcU?purpose=inline',
    description:
      'Fabric for creating your own preferred outfit.',
  },

  {
    id: '10',
    name: 'Women Stitched Suit',
    price: 2800,
    category: 'Clothes',
    gender: 'Female',
    subcategory: 'Stitched',
    image:
      'https://images.openai.com/static-rsc-4/vfX9JlaOj2TmFvzxfSsa_gpYgm7n1bMnsv_JeuLz8CR1E2_2z2wRA6DVfZRrUuJFqAm7kCU6H_6Z8f1JfWvS37Bu7f_TovpJ5sPuUskqKsXGpyijJ1uqb-pJxTAgOo8ebAbC2D_2jfZTNvwSALUr5--qvd07QyYqCtWJPRhjKDBKxGoixDEPedngK10zrczj?purpose=fullsize',
    description:
      'A ready-to-wear outfit for everyday elegance.',
  },
];

export default products;
