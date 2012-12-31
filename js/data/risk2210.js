window.Data = window.Data || {};

(function(Data){

  Data.Risk2210 = {
    name : 'Risk 2210 A.D.',
    id : 'risk2210',
    years : 5,
    players : {
      min: 2,
      max: 5,
      colors: { 'Red'   : 'rgba(255, 51, 89,0.8)',
                'Black' : 'rgba(0, 0, 0,0.8)',
                'Gold'  : 'rgba(233,136,31,0.8)',
                'Blue'  : 'rgba(2,102,222,0.8)',
                'Green' : 'rgba(2,156,194,0.8)'
              }
    },
    randomable: 'Land',
    boards: {
      'Earth' : {
        'Land' : {
          'North America' : {
            bonus : 5,
            color : '#bcbc3a',
            territories : {
              'Northwestern Oil Empire' : {
                id : 1,
                top: 15,
                left: 20,
                width: 70,
                height: 70
              },
              'Nunavut' : {
                id : 2,
                top: 15,
                left: 95,
                width: 130,
                height: 55
              },
              'Exiled States of America' : {
                id : 3,
                top: 15,
                left: 230,
                width: 135,
                height: 55
              },
              'Alberta' : {
                id : 4,
                top: 75,
                left: 95,
                width: 51,
                height: 65
              },
              'Canada' : {
                id : 5,
                top: 75,
                left: 150,
                width: 75,
                height: 65
              },
              'Republique du Quebec' : {
                id : 6,
                top: 75,
                left: 230,
                width: 70,
                height: 90
              },
              'Continental Biospheres' : {
                id : 7,
                top: 145,
                left: 90,
                width: 70,
                height: 75
              },
              'American Republic' : {
                id : 8,
                top: 145,
                left: 165,
                width: 60,
                height: 75
              },
              'Mexico' : {
                id : 9,
                top: 225,
                left: 120,
                width: 50,
                height: 70
              }
            }
          },
          'South America' : {
            bonus : 2,
            color : '#a35d3b',
            territories : {
              'Nuevo Timoto' : {
                id : 101,
                top: 310,
                left: 130,
                width: 95,
                height: 55
              },
              'Andean Nations' : {
                id : 102,
                top: 370,
                left: 120,
                width: 55,
                height: 75
              },
              'Amazon Desert' : {
                id : 103,
                top: 370,
                left: 180,
                width: 65,
                height: 145
              },
              'Argentina' : {
                id : 104,
                left: 120,
                top: 450,
                height: 135,
                width: 55
              }
            }
          },
          'Europe' : {
            bonus : 5,
            color : '#7f4eaa',
            territories : {
              'Iceland GRC' : {
                id : 201,
                top: 60,
                left: 370,
                width: 65,
                height: 45
              },
              'Jotenheim' : {
                id : 202,
                top: 40,
                left: 440,
                width: 105,
                height: 85
              },
              'New Avalon' : {
                id : 203,
                top: 110,
                left: 370,
                width: 65,
                height: 65
              },
              'Warsaw Republic' : {
                id : 204,
                top: 130,
                left: 440,
                width: 105,
                height: 45
              },
              'Andorra' : {
                id : 205,
                top: 180,
                left: 380,
                width: 85,
                height: 65
              },
              'Imperial Balkania' : {
                id : 206,
                top: 180,
                left: 470,
                width: 55,
                height: 65
              },
              'Ukrayina' : {
                id : 207,
                top: 50,
                left: 550,
                width: 95,
                height: 175
              }
            }
          },
          'Africa' : {
            bonus : 3,
            color : '#bed6da',
            territories : {
              'Saharan Empire' : {
                id : 301,
                top: 250,
                left: 350,
                width: 155,
                height: 145
              },
              'Egypt' : {
                id : 302,
                top: 270,
                left: 510,
                width: 65,
                height: 65
              },
              'Ministry of Djibouti' : {
                id : 303,
                top: 340,
                left: 510,
                width: 75,
                height: 155
              },
              'Zaire Military Zone' : {
                id : 304,
                top: 400,
                left: 450,
                width: 55,
                height: 95
              },
              'Lesotho' : {
                id : 305,
                top: 500,
                left: 480,
                width: 105,
                height: 85
              },
              'Madagascar' : {
                id : 306,
                top: 470,
                left: 590,
                width: 40,
                height: 85
              }
            }
          },
          'Asia' : {
            bonus : 7,
            color : '#95b08f',
            territories : {
              'Enclave of the Bear' : {
                id : 401,
                top: 20,
                left: 650,
                width: 75,
                height: 155
              },
              'Siberia' : {
                id : 402,
                top: 20,
                left: 730,
                width: 55,
                height: 155
              },
              'Sakha' : {
                id : 403,
                top: 20,
                left: 790,
                width: 85,
                height: 55
              },
              'Alden' : {
                id : 404,
                top: 80,
                left: 790,
                width: 85,
                height: 55
              },
              'Pevek' : {
                id : 405,
                top: 20,
                left: 880,
                width: 45,
                height: 115
              },
              'Khan Industrial State' : {
                id : 406,
                top: 140,
                left: 790,
                width: 135,
                height: 35
              },
              'Japan' : {
                id : 407,
                top: 110,
                left: 930,
                width: 45,
                height: 95
              },
              'Afghanistan' : {
                id : 408,
                top: 180,
                left: 650,
                width: 65,
                height: 65
              },
              'Hong Kong' : {
                id : 409,
                top: 180,
                left: 720,
                width: 165,
                height: 65
              },
              'Middle East' : {
                id : 410,
                top: 250,
                left: 580,
                width: 95,
                height: 75
              },
              'United Indiastan' : {
                id : 411,
                top: 250,
                left: 680,
                width: 125,
                height: 95
              },
              'Angkhor Wat' : {
                id : 412,
                top: 250,
                left: 810,
                width: 55,
                height: 125
              }
            }
          },
          'Australia' : {
            bonus : 2,
            color : '#db6c73',
            territories : {
              'Java Cartel' : {
                id : 501,
                top: 380,
                left: 830,
                width: 65,
                height: 85
              },
              'New Guinea' : {
                id : 502,
                top: 410,
                left: 900,
                width: 75,
                height: 85
              },
              'Aboriginal League' : {
                id : 503,
                top: 470,
                left: 810,
                width: 85,
                height: 135
              },
              'Australian Testing Ground' : {
                id : 504,
                top: 500,
                left: 900,
                width: 65,
                height: 145
              }
            }
          }
        },
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
      }
    }
  };

})( window.Data);
