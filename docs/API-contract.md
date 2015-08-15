
# API Contract

### User Profile

```javascript

// Send data
// these keys may not exist
// if user does not fill out all games

{
  sl_LOL_lane: "top",
  sl_LOL_region: "na",
  sl_LOL_role: "tank",
  sl_WOW_realm: "alleria",
  sl_WOW_region: "us",
  ta_BFHD_id: "HARDLINE PLAYER",
  ta_LOL_id: "PLAYER SUMMONER",
  ta_WOW_id: "WOW CHARACTER"
}

// Recieve 

{
  // TODO
  // are they duplicate
  // what games did we match
}

```

### Survey

```javascript

// send

{
  profile: {
    sl_LOL_lane: "top",
    sl_LOL_region: "na",
    sl_LOL_role: "tank",
    sl_WOW_realm: "alleria",
    sl_WOW_region: "us",
    ta_BFHD_id: "HARDLINE PLAYER",
    ta_LOL_id: "PLAYER SUMMONER",
    ta_WOW_id: "WOW CHARACTER",
    sl_gender: "male",
    sl_birth_month: "7",
    sl_birth_year: "1990",
    sl_country: "United_States",
    sl_english_lvl: "native"
  }
  survey: {
    QSEQ0: 1, // QSEQ = brain type
    IPIP0: 1, // IPIP = personality
    LOTR0: 1  // LOTR = gamer type
  }
}


```

