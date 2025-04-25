/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import search3Parser from './parsers/search3.js';
import accordion5Parser from './parsers/accordion5.js';
import carousel7Parser from './parsers/carousel7.js';
import accordion12Parser from './parsers/accordion12.js';
import accordion14Parser from './parsers/accordion14.js';
import hero15Parser from './parsers/hero15.js';
import columns8Parser from './parsers/columns8.js';
import accordion16Parser from './parsers/accordion16.js';
import columns1Parser from './parsers/columns1.js';
import hero6Parser from './parsers/hero6.js';
import columns13Parser from './parsers/columns13.js';
import carousel17Parser from './parsers/carousel17.js';
import columns18Parser from './parsers/columns18.js';
import tableStripedBordered22Parser from './parsers/tableStripedBordered22.js';
import columns23Parser from './parsers/columns23.js';
import accordion10Parser from './parsers/accordion10.js';
import accordion24Parser from './parsers/accordion24.js';
import embedVideo26Parser from './parsers/embedVideo26.js';
import accordion29Parser from './parsers/accordion29.js';
import hero9Parser from './parsers/hero9.js';
import accordion28Parser from './parsers/accordion28.js';
import cards30Parser from './parsers/cards30.js';
import embedVideo19Parser from './parsers/embedVideo19.js';
import columns32Parser from './parsers/columns32.js';
import accordion35Parser from './parsers/accordion35.js';
import columns25Parser from './parsers/columns25.js';
import cards36Parser from './parsers/cards36.js';
import accordion37Parser from './parsers/accordion37.js';
import accordion11Parser from './parsers/accordion11.js';
import carousel38Parser from './parsers/carousel38.js';
import search39Parser from './parsers/search39.js';
import accordion33Parser from './parsers/accordion33.js';
import carousel40Parser from './parsers/carousel40.js';
import accordion43Parser from './parsers/accordion43.js';
import columns42Parser from './parsers/columns42.js';
import accordion45Parser from './parsers/accordion45.js';
import columns41Parser from './parsers/columns41.js';
import accordion47Parser from './parsers/accordion47.js';
import cards46Parser from './parsers/cards46.js';
import cards44Parser from './parsers/cards44.js';
import cards50Parser from './parsers/cards50.js';
import carousel48Parser from './parsers/carousel48.js';
import accordion55Parser from './parsers/accordion55.js';
import accordion53Parser from './parsers/accordion53.js';
import accordion54Parser from './parsers/accordion54.js';
import cards49Parser from './parsers/cards49.js';
import tableBordered34Parser from './parsers/tableBordered34.js';
import columns27Parser from './parsers/columns27.js';
import embedVideo56Parser from './parsers/embedVideo56.js';
import columns2Parser from './parsers/columns2.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  search3: search3Parser,
  accordion5: accordion5Parser,
  carousel7: carousel7Parser,
  accordion12: accordion12Parser,
  accordion14: accordion14Parser,
  hero15: hero15Parser,
  columns8: columns8Parser,
  accordion16: accordion16Parser,
  columns1: columns1Parser,
  hero6: hero6Parser,
  columns13: columns13Parser,
  carousel17: carousel17Parser,
  columns18: columns18Parser,
  tableStripedBordered22: tableStripedBordered22Parser,
  columns23: columns23Parser,
  accordion10: accordion10Parser,
  accordion24: accordion24Parser,
  embedVideo26: embedVideo26Parser,
  accordion29: accordion29Parser,
  hero9: hero9Parser,
  accordion28: accordion28Parser,
  cards30: cards30Parser,
  embedVideo19: embedVideo19Parser,
  columns32: columns32Parser,
  accordion35: accordion35Parser,
  columns25: columns25Parser,
  cards36: cards36Parser,
  accordion37: accordion37Parser,
  accordion11: accordion11Parser,
  carousel38: carousel38Parser,
  search39: search39Parser,
  accordion33: accordion33Parser,
  carousel40: carousel40Parser,
  accordion43: accordion43Parser,
  columns42: columns42Parser,
  accordion45: accordion45Parser,
  columns41: columns41Parser,
  accordion47: accordion47Parser,
  cards46: cards46Parser,
  cards44: cards44Parser,
  cards50: cards50Parser,
  carousel48: carousel48Parser,
  accordion55: accordion55Parser,
  accordion53: accordion53Parser,
  accordion54: accordion54Parser,
  cards49: cards49Parser,
  tableBordered34: tableBordered34Parser,
  columns27: columns27Parser,
  embedVideo56: embedVideo56Parser,
  columns2: columns2Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
