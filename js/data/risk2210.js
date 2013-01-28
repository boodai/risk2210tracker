window.Data = window.Data || {};

(function(Data){

  var risk2210 = {
    id : 'g001',
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
        id : 'm001',
        name : 'Earth',
        display : {
          css : {
            width : 2048,
            height : 1362
          }
        },
        continents : {
          northAmerica : {
            id : 'c001',
            name : 'North America',
            bonus : 5,
            color : '#bcbc3a',
            type : 'land',
            territories : {
              northwesternOilEmpire : {
                id : 't001',
                name : 'Northwestern Oil Empire',
                display : {
                  css : { top:15, left:20, width:70, height:70 }
                }
              },
              nunavut : {
                id : 't002',
                name : 'Nunavut',
                display : {
                  css : { top:15, left:95, width:130, height:55 }
                }
              },
              exiledStatsOfAmerica : {
                id : 't003',
                name : 'Exiled States of America',
                display : {
                  css: { top:15, left:230, width:135, height:55 }
                }
              },
              alberta : {
                id : 't004',
                name : 'Alberta',
                display : {
                  css : { top:75, left:95, width:51, height:65 }
                }
              },
              canada : {
                id : 't005',
                name : 'Canada',
                display : {
                  css : { top:75, left:150, width:75, height:65 }
                }
              },
              republiqueDuQuebec : {
                id : 't006',
                name : 'Republique du Quebec',
                display : {
                  css : { top:75, left:230, width:70, height:90 }
                }
              },
              continentalBiospheres : {
                id : 't007',
                name : 'Continental Biospheres',
                display : {
                  css : { top:145, left:90, width:70, height:75 }
                }
              },
              americanRepublic : {
                id : 't008',
                name : 'American Republic',
                display : {
                  css : { top:145, left:165, width:60, height:75 }
                }
              },
              mexico : {
                id : 't009',
                name : 'Mexico',
                display : {
                  css : { top:225, left:120, width:50, height:70 }
                }
              }
            }
          }, // North America
          southAmerica : {
            id : 'c002',
            name : 'South America',
            bonus : 2,
            color : '#a35d3b',
            type : 'land',
            territories : {
              nuevoTimoto : {
                id : 't010',
                name : 'Nuevo Timoto',
                display : {
                  css : { top:310, left:130, width:95, height:55 }
                }
              },
              andeanNations : {
                id : 't011',
                name : 'Andean Nations',
                display : {
                  css : { top:370, left:120, width:55, height:75 }
                }
              },
              amazonDesert : {
                id : 't012',
                name : 'Amazon Desert',
                display : {
                  css : { top:370, left:180, width:65, height:145 }
                }
              },
              argentina : {
                id : 't013',
                name : 'Argentina',
                display : {
                  css : { left:120, top:450, height:135, width:55 }
                }
              }
            }
          }, // South America
          europe : {
            id : 'c003',
            name : 'Europe',
            bonus : 5,
            color : '#7f4eaa',
            type : 'land',
            territories : {
              icelandGrc : {
                id : 't014',
                name : 'Iceland GRC',
                display : {
                  css : { top:60, left:370, width:65, height:45 }
                }
              },
              jotenheim : {
                id : 't015',
                name : 'Jotenheim',
                display : {
                  css : { top:40, left:440, width:105, height:85 }
                }
              },
              newAvalon : {
                id : 't016',
                name : 'New Avalon',
                display : {
                  css : { top:110, left:370, width:65, height:65 }
                }
              },
              warsawRepublic : {
                id : 't017',
                name : 'Warsaw Republic',
                display : {
                  css : { top:130, left:440, width:105, height:45 }
                }
              },
              andorra : {
                id : 't018',
                name : 'Andorra',
                display : {
                  css : { top:180, left:380, width:85, height:65 }
                }
              },
              imperialBalkania : {
                id : 't019',
                name : 'Imperial Balkania',
                display : {
                  css : { top:180, left:470, width:55, height:65 }
                }
              },
              ukrayina : {
                id : 't020',
                name : 'Ukrayina',
                display : {
                  css : { top:50, left:550, width:95, height:175 }
                }
              }
            }
          }, // Europe
          africa : {
            id : 'c004',
            name : 'Africa',
            bonus : 3,
            color : '#bed6da',
            type : 'land',
            territories : {
              saharanEmpire : {
                id : 't021',
                name : 'Saharan Empire',
                display : {
                  css : { top:250, left:350, width:155, height:145 }
                }
              },
              egypt : {
                id : 't022',
                name : 'Egypt',
                display : {
                  css : { top:270, left:510, width:65, height:65 }
                }
              },
              ministryOfDjibouti : {
                id : 't023',
                name : 'Ministry of Djibouti',
                display : {
                  css : { top:340, left:510, width:75, height:155 }
                }
              },
              zaireMilitaryZone : {
                id : 't024',
                name : 'Zaire Military Zone',
                display : {
                  css : { top:400, left:450, width:55, height:95 }
                }
              },
              lesotho : {
                id : 't025',
                name : 'Lesotho',
                display : {
                  css : { top:500, left:480, width:105, height:85 }
                }
              },
              madagascar : {
                id : 't026',
                name : 'Madagascar',
                display : {
                  css : { top:470, left:590, width:40, height:85 }
                }
              }
            }
          }, // Africa
          asia : {
            id : 'c005',
            name : 'Asia',
            bonus : 7,
            color : '#95b08f',
            type : 'land',
            territories : {
              enclaveOfTheBear : {
                id : 't027',
                name : 'Enclave of the Bear',
                display : {
                  css : { top:20, left:650, width:75, height:155 }
                }
              },
              siberia : {
                id : 't028',
                name : 'Siberia',
                display : {
                  css : {
                    top: 20, left:730, width:55, height:155
                  }
                }
              },
              sakha : {
                id : 't029',
                name : 'Sakha',
                display : {
                  css : { top:20, left:790, width:85, height:55 }
                }
              },
              alden : {
                id : 't030',
                name : 'Alden',
                display : {
                  css : { top:80, left:790, width:85, height:55 }
                }
              },
              pevek : {
                id : 't031',
                name : 'Pevek',
                display : {
                  css : { top:20, left:880, width:45, height:115 }
                }
              },
              khanIndustrialState : {
                id : 't032',
                name : 'Khan Industrial State',
                display : {
                  css : { top:140, left:790, width:135, height:35 }
                }
              },
              japan : {
                id : 't033',
                name : 'Japan',
                display : {
                  css : { top:110, left:930, width:45, height:95 }
                }
              },
              afghanistan : {
                id : 't034',
                name : 'Afghanistan',
                display : {
                  css : { top:180, left:650, width:65, height:65 }
                }
              },
              hongKong : {
                id : 't035',
                name : 'Hong Kong',
                display : {
                  css : { top:180, left:720, width:165, height:65 }
                }
              },
              middleEast : {
                id : 't036',
                name : 'Middle East',
                display : {
                  css : { top:250, left:580, width:95, height:75 }
                }
              },
              unitedIndiastan : {
                id : 't037',
                name : 'United Indiastan',
                display : {
                  css : { top:250, left:680, width:125, height:95 }
                }
              },
              angkhorWat : {
                id : 't038',
                name : 'Angkhor Wat',
                display : {
                  css : { top:250, left:810, width:55, height:125 }
                }
              }
            }
          }, // Asia
          australia : {
            id : 'c006',
            name : 'Australia',
            bonus : 2,
            color : '#db6c73',
            type : 'land',
            territories : {
              javaCartel : {
                id : 't039',
                name : 'Java Cartel',
                display : {
                  css : { top:380, left:830, width:65, height:85 }
                }
              },
              newGuinea : {
                id : 't040',
                name : 'New Guinea',
                display : {
                  css : { top:410, left:900, width:75, height:85 }
                }
              },
              aboriginalLeague : {
                id : 't041',
                name : 'Aboriginal League',
                display : {
                  css : { top:470, left:810, width:85, height:135 }
                }
              },
              australianTestingGround : {
                id : 't042',
                name : 'Australian Testing Ground',
                display : {
                  css : { top:500, left:900, width:65, height:145 }
                }
              }
            }
          }, // Austrailia
          usPacific : {
            id : 'c007',
            name : 'US Pacific',
            bonus : 2,
            color : '#86c8de',
            type : 'water',
            territories : {
              poseidon : {
                id : 't043',
                name : 'Poseidon',
                display : {
                  css : { top: 105, left:20, width:60, height:60 }
                }
              },
              hawaiianPreserve : {
                id : 't044',
                name : 'Hawaiian Preserve',
                display : {
                  css : { top: 195, left:20, width:60, height:60 }
                }
              },
              newAtlantis : {
                id : 't045',
                name : 'New Atlantis',
                display : {
                  css : { top: 275, left:45, width:60, height:60 }
                }
              }
            }
          }, // US Pacific
          northAtlantic : {
            id : 'c008',
            name : 'North Atlantic',
            bonus : 2,
            color : '#f73b30',
            type : 'water',
            territories : {
              id : 't046',
              newYork : {
                name : 'New York',
                display : {
                  css : { top: 220, left:215, width:60, height:60 }
                }
              },
              westernIreland : {
                id : 't047',
                name : 'Western Ireland',
                display : {
                  css : { top: 180, left:290, width:60, height:60 }
                }
              },
              novaBrasilia : {
                id : 't048',
                name : 'Nova Brasilia',
                display : {
                  css : { top: 300, left:250, width:60, height:60 }
                }
              }
            }
          }, // North Atlantic
          southAtlantic : {
            id : 'c009',
            name : 'South Atlantic',
            bonus : 1,
            color : '#6abf26',
            type : 'water',
            territories : {
              neoPaulo : {
                id : 't049',
                name : 'Neo Paulo',
                display : {
                  css : { top: 435, left:275, width:60, height:60 }
                }
              },
              theIvoryReef : {
                id : 't050',
                name : 'The Ivory Reef',
                display : {
                  css : { top: 415, left:360, width:60, height:60 }
                }
              }
            }
          }, // South Atlantic
          indian : {
            id : 'c010',
            name : 'Indian',
            bonus : 2,
            color : '#d45c1d',
            type : 'water',
            territories : {
              southCeylon : {
                id : 't051',
                name : 'South Ceylon',
                display : {
                  css : { top: 380, left:665, width:60, height:60 }
                }
              },
              microcorp : {
                id : 't052',
                name : 'Microcorp',
                display : {
                  css : { top: 470, left:650, width:60, height:60 }
                }
              },
              akara : {
                id : 't053',
                name : 'Akara',
                display : {
                  css : { top: 515, left:725, width:60, height:60 }
                }
              }
            }
          }, // Indian
          asiaPacific : {
            id : 'c011',
            name : 'Asia Pacific',
            bonus : 1,
            color : '#d2d145',
            type : 'water',
            territories : {
              neoTokyo : {
                id : 't054',
                name : 'Neo Tokyo',
                display : {
                  css : { top: 240, left:910, width:60, height:60 }
                }
              },
              sungTzu : {
                id : 't055',
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
        id : 'm002',
        name : 'Moon',
        display : {
          css : {
            width : 2048,
            height : 1362
          }
        },
        continents : {
          cresinion : {
            id : 'c012',
            name : 'Cresinion',
            bonus : 2,
            color : '#b35f45',
            type : 'space',
            territories : {
              bayOfDew : {
                id : 't056',
                name : 'Bay of Dew',
                display : {
                  css : {}
                }
              },
              harpalus : {
                id : 't057',
                name : 'Harpalus',
                display : {
                  css : {}
                }
              },
              seaOfRains : {
                id : 't058',
                name : 'Sea of Rains',
                display : {
                  css : {}
                }
              },
              oceanOfStorms : {
                id : 't059',
                name : 'Ocean of Storms',
                display : {
                  css : {}
                }
              }
            }
          }, // Cresinion
          delphot : {
            id : 'c013',
            name : 'Delphot',
            bonus : 2,
            color : '#6f549b',
            type : 'space',
            territories : {
              aristotle : {
                id : 't060',
                name : 'Aristotle',
                display : {
                  css : {}
                }
              },
              seaOfSerenity : {
                id : 't061',
                name : 'Sea of Serenity',
                display : {
                  css : {}
                }
              },
              seaOfCrisis : {
                id : 't062',
                name : 'Sea of Crisis',
                display : {
                  css : {}
                }
              },
              seaOfNectar : {
                id : 't063',
                name : 'Sea of Nectar',
                display : {
                  css : {}
                }
              }
            }
          }, // Cresinion
          sajon : {
            id : 'c014',
            name : 'Sajon',
            bonus : 4,
            color : '#a2c988',
            type : 'space',
            territories : {
              byrgius : {
                id : 't064',
                name : 'Byrgius',
                display : {
                  css : {}
                }
              },
              seaOfClouds : {
                id : 't065',
                name : 'Sea of Clouds',
                display : {
                  css : {}
                }
              },
              marshOfDiseases : {
                id : 't066',
                name : 'Marsh of Diseases',
                display : {
                  css : {}
                }
              },
              rhaeticus : {
                id : 't067',
                name : 'Rhaeticus',
                display : {
                  css : {}
                }
              },
              straitWall : {
                id : 't068',
                name : 'Strait Wall',
                display : {
                  css : {}
                }
              },
              tycho : {
                id : 't069',
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

  Data.gameTypes = Data.gameTypes || {};
  Data.gameTypes.risk2210 = risk2210;

})( window.Data);
