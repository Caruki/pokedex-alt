export async function getMagicCards() {
  const response = await fetch(
    'https://api.scryfall.com/cards/search?order=set&q=e%3Athb&unique=prints'
  );
  const results = await response.json();
  const magicCards = results.data;
  const magicCardNames = magicCards.map(magicCard => {
    return magicCard.name;
  });
  return magicCardNames;
}

export async function filterResults(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const allCards = await getMagicCards();
  const filteredResults = allCards.filter(item => {
    if (searchValue.length > 0) {
      return item.toLowerCase().includes(lowerCaseSearchValue);
    }
  });
  return filteredResults;
}
/*
export const cardList = [
  'Akroma, Angel of Fury',
  'Akroma, Angel of Wrath',
  'Alexi, Zephyr Mage',
  'Anax and Cymede',
  'Anthousa, Setessan Hero',
  'Arcanis the Omnipotent',
  'Ashling, the Extinguisher',
  'Ashling the Pilgrim',
  'Asmira, Holy Avenger',
  'Atalya, Samite Master',
  'Aurelia, the Warleader',
  'Autumn Willow',
  'Avacyn, Angel of Hope',
  'Ayesha Tanaka',
  'Ayumi, the Last Visitor',
  'Azami, Lady of Scrolls',
  'Azusa, Lost but Seeking',
  'Basandra, Battle Seraph',
  'Braids, Cabal Minion',
  'Braids, Conjurer Adept',
  'Brigid, Hero of Kinsbaile',
  'Bruna, Light of Alabaster',
  'Captain Sisay',
  'Chorus of the Conclave',
  'Commander Eesha',
  'Damia, Sage of Stone',
  'Daughter of Autumn',
  'Derevi, Empyrial Tactician',
  'Diaochan, Artful Beauty',
  'Drana, Kalastria Bloodchief',
  'Elesh Norn, Grand Cenobite',
  'Emmara Tandris',
  'Empress Galina',
  'Emrakul, the Aeons Torn',
  'Ephara, God of the Polis',
  'Exava, Rakdos Blood Witch',
  'Fumiko the Lowblood',
  'Garza Zol, Plague Queen',
  'Gisela, Blade of Goldnight',
  'Glissa Sunseeker',
  'Glissa, the Traitor',
  'Grandmother Sengir',
  'Gwendlyn Di Corci',
  'Hanna, Ships Navigator',
  'Hikari Twilight Guardian',
  'Horobi, Deaths Wail',
  'Hythonia the Cruel',
  'Ink-Eyes, Servant of Oni',
  'Iona, Shield of Emeria',
  'Irini Sengir',
  'Isperia, Supreme Judge',
  'Isperia the Inscrutable',
  'Jaraku the Interloper',
  'Jasmine Boreal',
  'Jaya Ballard, Task Mage',
  'Jeleva, Nephalias Scourge',
  'Jenara, Asura of War',
  'Jeska, Warrior Adept',
  'Jhoira of the Ghitu',
  'Jolrael, Empress of Beasts',
  'Kaalia of the Vast',
  'Kaho, Minamo Historian',
  'Karametra, God of Harvests',
  'Karona, False God',
  'Kaysa',
  'Kemba, Kha Regent',
  'Kiku, Nights Flower',
  'Kira, Great Glass-Spinner',
  'Lady Caleria',
  'Lady Evangela',
  'Lady Orca',
  'Lady Sun',
  'Lady Zhurong, Warrior Queen',
  'Latulla, Keldon Overseer',
  'Lavinia of the Tenth',
  'Lin Sivvi, Defiant Hero',
  'Linessa, Zephyr Mage',
  'Linvala, Keeper of Silence',
  'Livonya Silone',
  'Llawan, Cephalid Empress',
  'Lovisa Coldeyes',
  'Lyzolda, the Blood Witch',
  'Maralen of the Mornsong',
  'Masako the Humorless',
  'Mayael the Anima',
  'Melira, Sylvok Outcast',
  'Merieke Ri Berit',
  'Michiko Konda, Truth Seeker',
  'Mirri, Cat Warrior',
  'Mirri the Cursed',
  'Myojin of Lifes Web',
  'Myojin of Nights Reach',
  'Nin, the Pain Artist',
  'Nylea, God of the Hunt',
  'Olivia Voldaren',
  'Oona, Queen of the Fae',
  'Orim, Samite Healer',
  'Oriss, Samite Guardian',
  'Oyobi, Who Split the Heavens',
  'Palladia-Mors',
  'Phage the Untouchable',
  'Pharika, God of Affliction',
  'Pianna, Nomad Captain',
  'Prime Speaker Zegana',
  'Princess Lucrezia',
  'Purraj of Urborg',
  'Radha, Heir to Keld',
  'Radiant, Archangel',
  'Rakka Mar',
  'Rashida Scalebane',
  'Rashka the Slayer',
  'Rayne, Academy Chancellor',
  'Razia, Boros Archangel',
  'Reveka, Wizard Savant',
  'Reya Dawnbringer',
  'Rith, the Awakener',
  'Rosheen Meanderer',
  'Rubinia Soulsinger',
  'Sachi, Daughter of Seshiro',
  'Saffi Eriksdotter',
  'Sakiko, Mother of Summer',
  'Sapling of Colfenor',
  'Savra, Queen of the Golgari',
  'Selenia, Dark Angel',
  'Sen Triplets',
  'Sharuum the Hegemon',
  'Shauku, Endbringer',
  'Sheoldred, Whispering One',
  'Shidako, Broodmistress',
  'Shisato, Whispering Hunter',
  'Shizuko, Caller of Autumn',
  'Sigarda, Host of Herons',
  'Sisters of Stone Death',
  'Sivitri Scarzam',
  'Sliver Queen',
  'Soraya the Falconer',
  'Sydri, Galvanic Genius',
  'Tariel, Reckoner of Souls',
  'Teysa, Envoy of Ghosts',
  'Teysa, Orzhov Scion',
  'Thada Adel, Acquisitor',
  'Thalia, Guardian of Thraben',
  'Thassa, God of the Sea',
  'The Lady of the Mountain',
  'Tibor and Lumia',
  'Treva, the Renewer',
  'Triad of Fates',
  'Trostani, Selesnyas Voice',
  'Tsabo Tavoc',
  'Uyo, Silent Prophet',
  'Vela the Night-Clad',
  'Vendilion Clique',
  'Visara the Dreadful',
  'Wort, Boggart Auntie',
  'Wort, the Raidmother',
  'Wydwen, the Biting Gale',
  'Xira Arien',
  'Yeva, Natures Herald',
  'Zedruu the Greathearted'
];
*/
