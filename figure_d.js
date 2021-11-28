//py -m http.server 8080
//Figure D shows player statistics

d3.json("18245.json").then(function (json) {
    console.log(json)
    ///dims of the pitch are as below
    //      width   = 800 - (800*(40/960)) - (800*(20/960)) 
    //              = 800 - 33.33 - 16.67 = 750
    //      height  = 800 * (68/105) - (800*(14.86/960)) - (800*(40/960))
    //              = 800 * .6476   - .7851    - 33.33 = 483.96
    //dims of the nodes are as below
    //      width   = 1350 - 50 - 10
    //      height  = 400 - 10 - 10
    var dimensions = {
        width: (1350 - 750),
        height: (400 - 484),
        margin: {
            top: 10,
            bottom: 10,
            right: 10,
            left: 50
        }
    }

    var jersey_numbers = {
        5597: 1, 5721: 2, 5485: 5, 5201: 4, 5552: 12, 5539: 14, 5463: 10, 5574: 8, 4926: 22, 19677: 9, 5207: 7, 6399: 11, 5202: 6
    }

    //    subset json //note that this includes incomplete passes 
    var df_pass = json.filter(function (d) {
        return (
            (d.team.name == 'Real Madrid') &&
            (d.type.name == 'Pass')
        );
    })
    console.log(df_pass[0].player.id)

    var df_5721 = json.filter(function (d) {
        if ((d.team.name == 'Real Madrid')) //&&
        //(d.player.id == 5721)) 
        {
            return (
                d
                //                       if (d.team.name == 'Real Madrid') &&
                //                      if (d.player.id != null) //5721
            );
        } //5721

    })
    console.log(df_5721)

    var df_5722 = json.filter(function (d) {
        if ((d.team.name == 'Real Madrid') &&
            (d.play_pattern.id == 1)) {
            return (
                d
                //                       if (d.team.name == 'Real Madrid') &&
                //                      if (d.player.id != null) //5721
            );
        } //5721

    })
    console.log(df_5722)

    var df_5723 = json.filter(function (d) {
        if ((d.team.name == 'Real Madrid') &&
            (d.player.name == 'Daniel Carvajal Ramos')) {
            return (
                d
                //                       if (d.team.name == 'Real Madrid') &&
                //                      if (d.player.id != null) //5721
            );
        } //5721

    })
    console.log(df_5723)

    //  var player_pass_n = 
    /*   for (i in jersey_numbers) {
          //const output = i
          console.log(i);
  
          console.log(
              df_pass.filter(function (d) {
                  return (
  
                  )
                  df_pass[d.player.id]
              });
          //return (output)
      }
   */


})
