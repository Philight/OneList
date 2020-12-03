

export const TestData = {
    artists: [
        {
            id: "spotify-art-The King Khan & BBQ Show",
            source: "spotify", 
            url: "https://open.spotify.com/artist/4n0gvapwYbRpzU5Ov68B6P", 
            images:{ 
                "height": 640,
                "url": "https://i.scdn.co/image/c52c95c28cbf57a5b9b775789799bacadb915292",
                "width": 640
            },
            name:"The King Khan & BBQ ShowTesttttttttttttttt",

        },
        {
            id: "youtube-art-B.B. King - Topic",
            source: "youtube", 
            url: "https://www.youtube.com/channel/UCqKrqzF3eX7R17m_MIMte4w", 
            images:{ 
                    "url": "https://yt3.ggpht.com/SBnRkAra7IwDVNIlpTxYNrZf8KGOeIz30HgYxGP8AdHGCNcj-lWWl7ltzO6qsiJVAWEDEkJT=s800-c-k-c0xffffffff-no-rj",
                },
            name:"B.B. King - Topic",
        },
    ],

    albums: [
        {
            id: "spotify-alb-The King Khan & BBQ Show",
            source: "spotify", 
            url: "https://open.spotify.com/album/7kHrwYwLS5HUng16CHd5rF", 
            images:{ 
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273f60414a19b24161285ac0ce5",
                "width": 640
            },
            name:"The King Khan & BBQ Show",
            artists:[ {
                url:"https://open.spotify.com/artist/4n0gvapwYbRpzU5Ov68B6P",
                name:"The King Khan & BBQ Show"
            } ], 
        },
        {
            id: "youtube-alb-B.B. King - The Thrill Is Gone [Crossroads 2010] (Official Live Video)",
            source:"youtube", 
            url:"https://www.youtube.com/watch?v=SgXSomPE_FY", 
            images:{ 
                "height": 360,
                "url": "https://i.ytimg.com/vi/SgXSomPE_FY/hqdefault.jpg",
                "width": 480
                },
                name:"B.B. King - The Thrill Is Gone [Crossroads 2010] (Official Live Video)",
                artists:[ {
                    url:"javascript:;",
                    name:"B.B. King"
                } ], 
        },
    ],

    tracks: [
        {
            id: "spotify-t-My Fairy King - BBC Session / February 5th 1973, Langham 1 Studio-Queen On Air",
            source: "spotify", 
            url: "https://open.spotify.com/track/22PDDxasXyFMek05JaWmVC", 
            images:{ 
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273600d8c91a95f0aa43afaa94b",
                "width": 640
            },
            name:"My Fairy King - BBC Session / February 5th 1973, Langham 1 Studio",
            artists:[ {
                url:"https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d",
                name:"Queen"
            } ], 
            album: {
                url: "https://open.spotify.com/album/60TXSuzXQoEy3p5cQEkLu7",
                name:"Queen On Air"    
            }
        },
        {
            id: "youtube-t-B.B. King - The Thrill Is Gone [Crossroads 2010] (Official Live Video)-RHINO",
            source:"youtube", 
            url:"https://www.youtube.com/watch?v=SgXSomPE_FY", 
            images:{ 
                "height": 360,
                "url": "https://i.ytimg.com/vi/SgXSomPE_FY/hqdefault.jpg",
                "width": 480
                },
                name:"B.B. King - The Thrill Is Gone [Crossroads 2010] (Official Live Video)",
                artists:[ {
                    url:"javascript:;",
                    name:"B.B. King"
                } ], 
                album: {
                    url: "https://www.youtube.com/channel/UCWEtnEiVwUy7mwFeshyAWLA",
                    name:"RHINO"  
                }
        },
    ]
}

