"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// see src/blendMode.js for available blend modes
// documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const { MODE } = require(path.join(basePath, "src/blendMode.js"));

const buildDir = path.join(basePath, "/build");
const layersDir = path.join(basePath, "/layers");

/*********************
 * General Generator Options
 ***********************/

const description =
  "This is the description of your NFT project, remember to replace this";
const baseUri = "ipfs://NewUriToReplace";

const outputJPEG = false; // if false, the generator outputs png's

/**
 * Set your tokenID index start number.
 * ⚠️ Be sure it matches your smart contract!
 */
const startIndex = 0;

const format = {
  width: 1024,
  height: 1024,
  smoothing: true, // set to false when up-scaling pixel art.
};

const background = {
  generate: true,
  brightness: "100%",
};

const layerConfigurations = [
  {
    growEditionSizeTo: 90,
    namePrefix: "Miyamaker", // Use to add a name to Metadata `name:`
    layersOrder: [
      { name: "z-3,Background" },
      { name: "Body" },
      { name: "Eyes" },
      { name: "Mouth" },
      { name: "Nose" },
      { name: "Top" },
      { name: "Hair" },
      { name: "z-1,Hair Behind"},
      { name: "Mask" },
      { name: "Hat" },
      { name: "z-2,Hat" },
      { name: "z3,Left Arm" },
      { name: "z3,Right Arm" },
      { name: "z5,Overlay" },
      { name: "z4,Overlay 2" },
    ],
  },
  // {
  //   growEditionSizeTo: 10,
  //   namePrefix: "Lion",
  //   resetNameIndex: true, // this will start the Lion count at #1 instead of #6
  //   layersOrder: [
  //     { name: "Background" },
  //     { name: "Hats" },
  //     { name: "Male Hair" },
  //   ],
  // },
];

/**
 * Set to true for when using multiple layersOrder configuration
 * and you would like to shuffle all the artwork together
 */
const shuffleLayerConfigurations = false;

const debugLogs = true;

/*********************
 * Advanced Generator Options
 ***********************/

// if you use an empty/transparent file, set the name here.
const emptyLayerName = "NONE";

/**
 * Incompatible items can be added to this object by a files cleanName
 * This works in layer order, meaning, you need to define the layer that comes
 * first as the Key, and the incompatible items that _may_ come after.
 * The current version requires all layers to have unique names, or you may
 * accidentally set incompatibilities for the _wrong_ item.
 */
const incompatible = {
  //   Red: ["Dark Long"],
  //   // directory incompatible with directory example
  //   White: ["rare-Pink-Pompadour"],
};

/**
 * Require combinations of files when constructing DNA, this bypasses the
 * randomization and weights.
 *
 * The layer order matters here, the key (left side) is an item within
 * the layer that comes first in the stack.
 * the items in the array are "required" items that should be pulled from folders
 * further in the stack
 */
const forcedCombinations = {
  Hair: ["Black Straight Straight Bangs with Diamond Clip", "Black Straight Straight Bangs with Diamond Clip"],
  Hair: ["Blonde Crazy Ties Copy","Blonde Crazy Ties Copy"],
  Hair: ["Blonde Crazy Ties","Blonde Crazy Ties"],
  Hair: ["Blonde Curls","Blonde Curls"],
  Hair: ["Blonde spiked Bangs","Blonde spiked Bangs"],
  Hair: ["Blue Bangs","Blue Bangs"],
  Hair: ["Blue Bob","Blue Bob"],
  Hair: ["Brown Curly","Brown Curly"],
  Hair: ["Brown Long Wavy","Brown Long Wavy"],
  Hair: ["Brunette Long Straight","Brunette Long Straight"],
  Hair: ["Brunette Wind Blown Long","Brunette Wind Blown Long"],
  Hair: ["Dreadlocks with Green Bangs","Dreadlocks with Green Bangs"],
  Hair: ["Light Brown Choppy Bangs","Light Brown Choppy Bangs"],
  Hair: ["Long Brown V Cut Bangs","Long Brown V Cut Bangs"],
  Hair: ["Long Dreads","Long Dreads"],
  Hair: ["Long Norse Blonde hair with Princess Braids","Long Norse Blonde hair with Princess Braids"],
  Hair: ["McChibi Sailor Braid Buns","McChibi Sailor Braid Buns"],
  Hair: ["OG Miya Brown","OG Miya Brown"],
  Hair: ["Pastel Green Emo Swoop","Pastel Green Emo Swoop"],
  Hair: ["Spiky Brown","Spiky Brown"],
  Hat: ["Aztec Warrior","Aztec Warrior"],
  Hat: ["Chinese Royalty","Chinese Royalty"],
};

/**
 * In the event that a filename cannot be the trait value name, for example when
 * multiple items should have the same value, specify
 * clean-filename: trait-value override pairs. Wrap filenames with spaces in quotes.
 */
const traitValueOverrides = {
  Helmet: "Space Helmet",
  "gold chain": "GOLDEN NECKLACE",
};

const extraMetadata = {};

const extraAttributes = () => [
  // Optionally, if you need to overwrite one of your layers attributes.
  // You can include the same name as the layer, here, and it will overwrite
  //
  // {
  // trait_type: "Bottom lid",
  //   value: ` Bottom lid # ${Math.random() * 100}`,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Aqua Power",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Health",
  //   value: Math.random() * 100,
  // },
  // {
  //   display_type: "boost_number",
  //   trait_type: "Mana",
  //   value: Math.floor(Math.random() * 100),
  // },
];

// Outputs an Keccack256 hash for the image. Required for provenance hash
const hashImages = true;

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

/**
 * Set to true to always use the root folder as trait_type
 * Set to false to use weighted parent folders as trait_type
 * Default is true.
 */
const useRootTraitType = true;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  background,
  baseUri,
  buildDir,
  debugLogs,
  description,
  emptyLayerName,
  extraAttributes,
  extraMetadata,
  forcedCombinations,
  format,
  hashImages,
  incompatible,
  layerConfigurations,
  layersDir,
  outputJPEG,
  preview,
  preview_gif,
  rarityDelimiter,
  shuffleLayerConfigurations,
  startIndex,
  traitValueOverrides,
  uniqueDnaTorrance,
  useRootTraitType,
};
