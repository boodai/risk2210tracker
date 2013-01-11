window.Data = window.Data || {};

(function(Data){

  var risk2210 = {
    name : 'Risk 2210 A.D.',
    years : {
      min : 2,
      max : 99,
      default : 5
    },
    players : {
      min : 2,
      max : 5,
      colors : {
        red : {
          name : 'Red',
          rgba : 'rgba(255, 51, 89, 0.8)'
        },
        black : {
          name : 'Black',
          rgba : 'rgba(0, 0, 0, 0.8)'
        },
        gold : {
          name : 'Gold',
          rgba : 'rgba(233,136,31, 0.8)'
        },
        blue : {
          name : 'Blue',
          rgba : 'rgba(2,102,222, 0.8)'
        },
        green : {
          name : 'Green',
          rgba : 'rgba(2,156,194, 0.8)'
        }
      }
    },
    maps : {
      earth : {
        name : 'Earth',
        display : {
          css : {
            width : 2048,
            height : 1362
          }
        },
        continents : {
          northAmerica : {
            name : 'North America',
            bonus : 5,
            color : '#bcbc3a',
            type : 'land',
            territories : {
              northwesternOilEmpire : {
                name : 'Northwestern Oil Empire',
                display : {
                  css : { top:15, left:20, width:70, height:70 }
                }
              },
              nunavut : {
                name : 'Nunavut',
                display : {
                  css : { top:15, left:95, width:130, height:55 }
                }
              },
              exiledStatsOfAmerica : {
                name : 'Exiled States of America',
                display : {
                  css: { top:15, left:230, width:135, height:55 }
                }
              },
              alberta : {
                name : 'Alberta',
                display : {
                  css : { top:75, left:95, width:51, height:65 }
                }
              },
              canada : {
                name : 'Canada',
                display : {
                  css : { top:75, left:150, width:75, height:65 }
                }
              },
              republiqueDuQuebec : {
                name : 'Republique du Quebec',
                display : {
                  css : { top:75, left:230, width:70, height:90 }
                }
              },
              continentalBiospheres : {
                name : 'Continental Biospheres',
                display : {
                  css : { top:145, left:90, width:70, height:75 }
                }
              },
              americanRepublic : {
                name : 'American Republic',
                display : {
                  css : { top:145, left:165, width:60, height:75 }
                }
              },
              mexico : {
                name : 'Mexico',
                display : {
                  css : { top:225, left:120, width:50, height:70 }
                }
              }
            }
          }, // North America
          southAmerica : {
            name : 'South America',
            bonus : 2,
            color : '#a35d3b',
            type : 'land',
            territories : {
              nuevoTimoto : {
                name : 'Nuevo Timoto',
                display : {
                  css : { top:310, left:130, width:95, height:55 }
                }
              },
              andeanNations : {
                name : 'Andean Nations',
                display : {
                  css : { top:370, left:120, width:55, height:75 }
                }
              },
              amazonDesert : {
                name : 'Amazon Desert',
                display : {
                  css : { top:370, left:180, width:65, height:145 }
                }
              },
              argentina : {
                name : 'Argentina',
                display : {
                  css : { left:120, top:450, height:135, width:55 }
                }
              }
            }
          }, // South America
          europe : {
            name : 'Europe',
            bonus : 5,
            color : '#7f4eaa',
            type : 'land',
            territories : {
              icelandGrc : {
                name : 'Iceland GRC',
                display : {
                  css : { top:60, left:370, width:65, height:45 }
                }
              },
              jotenheim : {
                name : 'Jotenheim',
                display : {
                  css : { top:40, left:440, width:105, height:85 }
                }
              },
              newAvalon : {
                name : 'New Avalon',
                display : {
                  css : { top:110, left:370, width:65, height:65 }
                }
              },
              warsawRepublic : {
                name : 'Warsaw Republic',
                display : {
                  css : { top:130, left:440, width:105, height:45 }
                }
              },
              andorra : {
                name : 'Andorra',
                display : {
                  css : { top:180, left:380, width:85, height:65 }
                }
              },
              imperialBalkania : {
                name : 'Imperial Balkania',
                display : {
                  css : { top:180, left:470, width:55, height:65 }
                }
              },
              ukrayina : {
                name : 'Ukrayina',
                display : {
                  css : { top:50, left:550, width:95, height:175 }
                }
              }
            }
          }, // Europe
          africa : {
            name : 'Africa',
            bonus : 3,
            color : '#bed6da',
            type : 'land',
            territories : {
              saharanEmpire : {
                name : 'Saharan Empire',
                display : {
                  css : { top:250, left:350, width:155, height:145 }
                }
              },
              egypt : {
                name : 'Egypt',
                display : {
                  css : { top:270, left:510, width:65, height:65 }
                }
              },
              ministryOfDjibouti : {
                name : 'Ministry of Djibouti',
                display : {
                  css : { top:340, left:510, width:75, height:155 }
                }
              },
              zaireMilitaryZone : {
                name : 'Zaire Military Zone',
                display : {
                  css : { top:400, left:450, width:55, height:95 }
                }
              },
              lesotho : {
                name : 'Lesotho',
                display : {
                  css : { top:500, left:480, width:105, height:85 }
                }
              },
              madagascar : {
                name : 'Madagascar',
                display : {
                  css : { top:470, left:590, width:40, height:85 }
                }
              }
            }
          }, // Africa
          asia : {
            name : 'Asia',
            bonus : 7,
            color : '#95b08f',
            type : 'land',
            territories : {
              enclaveOfTheBear : {
                name : 'Enclave of the Bear',
                display : {
                  css : { top:20, left:650, width:75, height:155 }
                }
              },
              siberia : {
                name : 'Siberia',
                display : {
                  css : {
                    top: 20, left:730, width:55, height:155
                  }
                }
              },
              sakha : {
                name : 'Sakha',
                display : {
                  css : { top:20, left:790, width:85, height:55 }
                }
              },
              alden : {
                name : 'Alden',
                display : {
                  css : { top:80, left:790, width:85, height:55 }
                }
              },
              pevek : {
                name : 'Pevek',
                display : {
                  css : { top:20, left:880, width:45, height:115 }
                }
              },
              khanIndustrialState : {
                name : 'Khan Industrial State',
                display : {
                  css : { top:140, left:790, width:135, height:35 }
                }
              },
              japan : {
                name : 'Japan',
                display : {
                  css : { top:110, left:930, width:45, height:95 }
                }
              },
              afghanistan : {
                name : 'Afghanistan',
                display : {
                  css : { top:180, left:650, width:65, height:65 }
                }
              },
              hongKong : {
                name : 'Hong Kong',
                display : {
                  css : { top:180, left:720, width:165, height:65 }
                }
              },
              middleEast : {
                name : 'Middle East',
                display : {
                  css : { top:250, left:580, width:95, height:75 }
                }
              },
              unitedIndiastan : {
                name : 'United Indiastan',
                display : {
                  css : { top:250, left:680, width:125, height:95 }
                }
              },
              angkhorWat : {
                name : 'Angkhor Wat',
                display : {
                  css : { top:250, left:810, width:55, height:125 }
                }
              }
            }
          }, // Asia
          australia : {
            name : 'Australia',
            bonus : 2,
            color : '#db6c73',
            type : 'land',
            territories : {
              javaCartel : {
                name : 'Java Cartel',
                display : {
                  css : { top:380, left:830, width:65, height:85 }
                }
              },
              newGuinea : {
                name : 'New Guinea',
                display : {
                  css : { top:410, left:900, width:75, height:85 }
                }
              },
              aboriginalLeague : {
                name : 'Aboriginal League',
                display : {
                  css : { top:470, left:810, width:85, height:135 }
                }
              },
              australianTestingGround : {
                name : 'Australian Testing Ground',
                display : {
                  css : { top:500, left:900, width:65, height:145 }
                }
              }
            }
          }, // Austrailia
          usPacific : {
            name : 'US Pacific',
            bonus : 2,
            color : '#86c8de',
            type : 'water',
            territories : {
              poseidon : {
                name : 'Poseidon',
                display : {
                  css : { top: 105, left:20, width:60, height:60 }
                }
              },
              hawaiianPreserve : {
                name : 'Hawaiian Preserve',
                display : {
                  css : { top: 195, left:20, width:60, height:60 }
                }
              },
              newAtlantis : {
                name : 'New Atlantis',
                display : {
                  css : { top: 275, left:45, width:60, height:60 }
                }
              }
            }
          }, // US Pacific
          northAtlantic : {
            name : 'North Atlantic',
            bonus : 2,
            color : '#f73b30',
            type : 'water',
            territories : {
              newYork : {
                name : 'New York',
                display : {
                  css : { top: 220, left:215, width:60, height:60 }
                }
              },
              westernIreland : {
                name : 'Western Ireland',
                display : {
                  css : { top: 180, left:290, width:60, height:60 }
                }
              },
              novaBrasilia : {
                name : 'Nova Brasilia',
                display : {
                  css : { top: 300, left:250, width:60, height:60 }
                }
              }
            }
          }, // North Atlantic
          southAtlantic : {
            name : 'South Atlantic',
            bonus : 1,
            color : '#6abf26',
            type : 'water',
            territories : {
              neoPaulo : {
                name : 'Neo Paulo',
                display : {
                  css : { top: 435, left:275, width:60, height:60 }
                }
              },
              theIvoryReef : {
                name : 'The Ivory Reef',
                display : {
                  css : { top: 415, left:360, width:60, height:60 }
                }
              }
            }
          }, // South Atlantic
          indian : {
            name : 'Indian',
            bonus : 2,
            color : '#d45c1d',
            type : 'water',
            territories : {
              southCeylon : {
                name : 'South Ceylon',
                display : {
                  css : { top: 380, left:665, width:60, height:60 }
                }
              },
              microcorp : {
                name : 'Microcorp',
                display : {
                  css : { top: 470, left:650, width:60, height:60 }
                }
              },
              akara : {
                name : 'Akara',
                display : {
                  css : { top: 515, left:725, width:60, height:60 }
                }
              }
            }
          }, // Indian
          asiaPacific : {
            name : 'Asia Pacific',
            bonus : 1,
            color : '#d2d145',
            type : 'water',
            territories : {
              neoTokyo : {
                name : 'Neo Tokyo',
                display : {
                  css : { top: 240, left:910, width:60, height:60 }
                }
              },
              sungTzu : {
                name : 'Sung Tzu',
                display : {
                  css : { top: 325, left:915, width:60, height:60 }
                }
              }
            }
          } // Asia Pacific
        } // Continents
      }, // earth
      moon : {
        name : 'Moon',
        display : {
          css : {
            width : 2048,
            height : 1362
          }
        },
        continents : {
          cresinion : {
            name : 'Cresinion',
            bonus : 2,
            color : '#b35f45',
            type : 'space',
            territories : {
              bayOfDew : {
                name : 'Bay of Dew',
                display : {
                  css : {}
                }
              },
              harpalus : {
                name : 'Harpalus',
                display : {
                  css : {}
                }
              },
              seaOfRains : {
                name : 'Sea of Rains',
                display : {
                  css : {}
                }
              },
              oceanOfStorms : {
                name : 'Ocean of Storms',
                display : {
                  css : {}
                }
              }
            }
          }, // Cresinion
          delphot : {
            name : 'Delphot',
            bonus : 2,
            color : '#6f549b',
            type : 'space',
            territories : {
              aristotle : {
                name : 'Aristotle',
                display : {
                  css : {}
                }
              },
              seaOfSerenity : {
                name : 'Sea of Serenity',
                display : {
                  css : {}
                }
              },
              seaOfCrisis : {
                name : 'Sea of Crisis',
                display : {
                  css : {}
                }
              },
              seaOfNectar : {
                name : 'Sea of Nectar',
                display : {
                  css : {}
                }
              }
            }
          }, // Cresinion
          sajon : {
            name : 'Sajon',
            bonus : 4,
            color : '#a2c988',
            type : 'space',
            territories : {
              byrgius : {
                name : 'Byrgius',
                display : {
                  css : {}
                }
              },
              seaOfClouds : {
                name : 'Sea of Clouds',
                display : {
                  css : {}
                }
              },
              marshOfDiseases : {
                name : 'Marsh of Diseases',
                display : {
                  css : {}
                }
              },
              rhaeticus : {
                name : 'Rhaeticus',
                display : {
                  css : {}
                }
              },
              straitWall : {
                name : 'Strait Wall',
                display : {
                  css : {}
                }
              },
              tycho : {
                name : 'Tycho',
                display : {
                  css : {}
                }
              }
            }
          } // Sajon
        } // Continents
      } // moon
    } // maps
  }; // risk2210

  gameTypes = Data.gameTypes || {};
  gameTypes.risk2210 = risk2210;

})( window.Data);
