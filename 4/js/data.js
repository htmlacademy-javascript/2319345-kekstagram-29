import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './utils.js';

const DESCRIPTIONS = [
	'Adskfmf',
	'Befjeiw',
	'Cvdifmdb',
	'Deferdmgfnh',
	'Efbgfbfgbngfp',
	'Fiwdmawsn',
	'Gemeisds',
	'Herwerweopfm',
	'Ilfkmsdkf',
	'Jemfdaskld,',
	'Krfsod',
	'Ledndjn',
	'Mngefme',
	'Nsaijds',
	'Odocdoc',
	'Puhtgfdxc',
	'Qjndfjg',
	'Rfgklhn',
	'Sdfghj',
	'Tfodop',
	'Ucsdfpg',
	'Vsfgnthktym',
	'Wfdfbfgomh',
	'Xdogfmghojm',
	'Yuiuy'
];

const NAMES = [
	'Julia',
	'Maria',
	'Irina',
	'James',
	'Vasiliy'
];

const MESSAGES = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 25;
const COMMENTS_COUNT = 30;

const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTO_COUNT);

const createComment = (...attrs) => ({
	id: attrs[1],
	avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
	message: `${getRandomArrayElement(MESSAGES)}`,
	name: `${getRandomArrayElement(NAMES)}`,
});

const commentsCollection = Array.from({length: getRandomInteger(0, COMMENTS_COUNT)}, createComment);

const createPhotoDescription = () => {
	const photoId = generatePhotoId();
	return {
		id: photoId,
		url:`photos/${photoId}.jpg`,
		description: `${getRandomArrayElement(DESCRIPTIONS)}`,
		likes: getRandomInteger(15, 200),
		comments: commentsCollection
	};
};

const createPhotoCollection = () => Array.from({length: PHOTO_COUNT}, createPhotoDescription);

export {createPhotoCollection};
