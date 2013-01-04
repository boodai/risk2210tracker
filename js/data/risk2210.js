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
        } // Continents
      } // earth
    } // maps
  }; // risk2210





a = {
  randomable: 'Land',
  boards: {
    'Earth' : {

      'Water': {
        'US Pacific' : {
          bonus : 2,
          color : '#86c8de',
          territories : {
            'Poseidon' : {
              id : 1001,
              top: 105,
              left: 20,
              width: 60,
              height: 60
            },
            'Hawaiian Preserve' : {
              id : 1002,
              top: 195,
              left: 20,
              width: 60,
              height: 60
            },
            'New Atlantis' : {
              id : 1003,
              top: 275,
              left: 45,
              width: 60,
              height: 60
            }
          }
        },
        'North Atlantic' : {
          bonus : 2,
          color : '#f73b30',
          territories : {
            'New York' : {
              id : 1101,
              top: 220,
              left: 215,
              width: 60,
              height: 60
            },
            'Western Ireland' : {
              id : 1102,
              top: 180,
              left: 290,
              width: 60,
              height: 60
            },
            'Nova Brasilia' : {
              id : 1103,
              top: 300,
              left: 250,
              width: 60,
              height: 60
            }
          }
        },
        'South Atlantic' : {
          bonus : 1,
          color : '#6abf26',
          territories : {
            'Neo Paulo' : {
              id : 1201,
              top: 435,
              left: 275,
              width: 60,
              height: 60
            },
            'The Ivory Reef' : {
              id : 1202,
              top: 415,
              left: 360,
              width: 60,
              height: 60
            }
          }
        },
        'Indian' : {
          bonus : 2,
          color : '#d45c1d',
          territories : {
            'South Ceylon' : {
              id : 1301,
              top: 380,
              left: 665,
              width: 60,
              height: 60
            },
            'Microcorp' : {
              id : 1302,
              top: 470,
              left: 650,
              width: 60,
              height: 60
            },
            'Akara' : {
              id : 1303,
              top: 515,
              left: 725,
              width: 60,
              height: 60
            }
          }
        },
        'Asia Pacific' : {
          bonus : 1,
          color : '#d2d145',
          territories : {
            'Neo Tokyo' : {
              id : 1401,
              top: 240,
              left: 910,
              width: 60,
              height: 60
            },
            'Sung Tzu' : {
              id : 1402,
              top: 325,
              left: 915,
              width: 60,
              height: 60
            }
          }
        }
      }
    },
    'Moon' : {
      'Space': {
        'Cresinion' : {
          bonus : 2,
          color : '#b35f45',
          territories : {
            'Bay of Dew' : {
              id : 2001
            },
            'Harpalus' : {
              id : 2002
            },
            'Sea of Rains' : {
              id : 2003
            },
            'Ocean of Storms' : {
              id : 2004
            }
          }
        },
        'Delphot' : {
          bonus : 2,
          color : '#6f549b',
          territories : {
            'Aristotle' : {
              id : 2101
            },
            'Sea of Serenity' : {
              id : 2102
            },
            'Sea of Crisis' : {
              id : 2103
            },
            'Sea of Nectar' : {
              id : 2104
            }
          }
        },
        'Sajon' : {
          bonus : 4,
          color : '#a2c988',
          territories : {
            'Byrgius' : {
              id : 2201
            },
            'Sea of Clouds' : {
              id : 2202
            },
            'Marsh of Diseases' : {
              id : 2203
            },
            'Rhaeticus' : {
              id : 2204
            },
            'Strait Wall' : {
              id : 2205
            },
            'Tycho' : {
              id : 2206
            }
          }
        }
      }
    };

gameTypes = Data.gameTypes || {};



})( window.Data);
