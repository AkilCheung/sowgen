$(document).ready(() => {
    regions.forEach(regionObj => {
        $('#ddRegions').append(`<option value="${regionObj.name}">${regionObj.name}</option>`);
    });

    //prepare dms dropdown
    for (let src in srcRef) {
        $('#dmsSrc').append(`<option value="${src}">${src}</option>`);        
    }
    for (let dest in destRef) {
        $('#dmsDest').append(`<option value="${dest}">${dest}</option>`);        
    }

    //for show/hide extra option, extra option <div> id must be "hideFor<checkbox id>" e.g. hideForcbDMS for cbDMS
    $('#compForm input[type=checkbox]').change((e) => {
        exOptId = 'hideFor' + e.target.id;
        if (e.target.checked) {
            //show the extra option
            $('#' + exOptId).removeClass('d-none');
        } else {
            //hide the extra option
            $('#' + exOptId).addClass('d-none');
        }
    });

    $('#btnGenerate').click(e => {
        //prepare the selected components
        var selectedComponents = [];
        $('#compForm input[type=checkbox]:checked').each((index, el) => {
            selectedComponents.push($(el).val());
        });

        console.log(selectedComponents);

        //generate the output
        var assumptionContent = '';
        var sowContent = '';
        var customerRespContent = '';
        var oosContent = '';

        oosContent = '<ul>';
        generalOOS.forEach(oosStr => {
            oosContent = oosContent.concat('<li>' + oosStr + '</li>');
        })

        assumptionContent = '<ul>';
        customerRespContent = '<ul>';


        selectedComponents.forEach(str => {
            //try to replace the orignal values first
            if (components[str].originalSOW != null)
                components[str].sow = components[str].originalSOW.slice(0);
            else
                //keep records on original sow
                components[str].originalSOW = components[str].sow.slice(0);

            if (components[str].originalAssumptions != null)
                components[str].assumptions = components[str].originalAssumptions.slice(0);
            else
                //keep records on original sow
                components[str].originalAssumptions = components[str].assumptions.slice(0);

            //execute sowHandler first to inject content
            if (components[str].sowHandler != null) {
                components[str].sowHandler();
            }

            if (components[str].assumptionsHandler != null) {
                components[str].assumptionsHandler();
            }
        });

        selectedComponents.forEach(str => {

            components[str].assumptions.forEach(assStr => {
                assumptionContent = assumptionContent.concat('<li>' + assStr + '</li>');
            });

            if (components[str].sowHeader != null) {
                sowContent = sowContent.concat('<p><strong>' + components[str].sowHeader + '</strong><br/>');
                sowContent += '<ul>';
                components[str].sow.forEach(sowStr => {
                    sowContent = sowContent.concat('<li>' + sowStr + '</li>');
                })
                sowContent += '</ul>';
                sowContent = sowContent.concat('</p>');
            }


            components[str].customerResp.forEach(respStr => {
                customerRespContent = customerRespContent.concat('<li>' + respStr + '</li>');
            });

            components[str].oos.forEach(oosStr => {
                oosContent = oosContent.concat('<li>' + oosStr + '</li>');
            });
        });
        customerRespContent += '</ul>';
        assumptionContent += '</ul>';
        oosContent += '</ul>';

        $('#output').empty();

        //region str
        const regionAssumption = '<li>' + $('#ddRegions').val() + ' region will be used </li>';
        $('#output').append('<h2>Assumption</h2>');
        //$('#output').append('<p>' + regionAssumption + assumptionContent + '</p>');

        var obj = $($.parseHTML(assumptionContent));
        obj.prepend(regionAssumption);
        $('#output').append(obj);

        $('#output').append('<h2>SOW</h2>');
        $('#output').append(sowContent);

        $('#output').append('<h2>Customer Responsibility</h2>');
        $('#output').append('<p>' + customerRespContent + '</p>');

        $('#output').append('<h2>Out of Scope</h2>');
        $('#output').append('<p>' + oosContent + '</p>');
    });
});
