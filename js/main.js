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

    const generateExcelFunction = (e) => {
        console.log(e);
         /* Create worksheet from HTML DOM TABLE */
        var wb = XLSX.utils.table_to_book(document.getElementById('outputTable'));
        /* Export to file (start a download) */
        XLSX.writeFile(wb, 'GeneratedSOWTable.xlsx');
    }

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
        var outputElement = $('#output');
        var outputTable = $('#outputTable');

        generalOOS.forEach(oosStr => {
            oosContent = oosContent.concat('<tr><td>' + oosStr + '</td></tr>');
        })

        // assumptionContent = '<ul>';
        // customerRespContent = '<ul>';


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
                assumptionContent = assumptionContent.concat('<tr><td>' + assStr + '</td></tr>');
            });

            if (components[str].sowHeader != null) {
                // sowContent = sowContent.concat('<p><strong>' + components[str].sowHeader + '</strong><br/>');
                // sowContent += '<ul>';
                sowContent = sowContent.concat('<tr><td><strong>' + components[str].sowHeader + '</strong></td></tr>');
                components[str].sow.forEach(sowStr => {
                    sowContent = sowContent.concat('<tr><td>' + sowStr + '</td></tr>');
                })
                // sowContent += '</ul>';
                // sowContent = sowContent.concat('</p>');
            }


            components[str].customerResp.forEach(respStr => {
                customerRespContent = customerRespContent.concat('<tr><td>' + respStr + '</td></tr>');
            });

            components[str].oos.forEach(oosStr => {
                oosContent = oosContent.concat('<tr><td>' + oosStr + '</td></tr>');
            });
        });
        // customerRespContent += '</ul>';
        // assumptionContent += '</ul>';

        outputElement.empty();
        outputTable.empty();

        //region str
        const regionAssumption = '<li>' + $('#ddRegions').val() + ' region will be used </li>';
        console.log($('#output table').length > 0)
        outputTable.append('<tr><td>Assumption</td></tr>');
        //$('#output').append('<p>' + regionAssumption + assumptionContent + '</p>');

        var obj = $($.parseHTML(assumptionContent));
        console.log(obj)
        // obj.prepend(regionAssumption);
        outputTable.append(obj);

        outputTable.append('<tr><td><h2>SOW</h2></td></tr>');
        outputTable.append(sowContent);

        outputTable.append('<tr><td><h2>Customer Responsibility</h2></td></tr>');
        outputTable.append(customerRespContent);

        outputTable.append('<tr><td><h2>Out of Scope</h2></td></tr>');
        outputTable.append(oosContent);

        outputElement.append(outputTable);

        const excelButton = $('<button>');
        excelButton.addClass('btn btn-outline-primary').attr('id', 'excelButton').text('Generate Excel');
        excelButton.click(generateExcelFunction);
        outputElement.append(excelButton);
    });
});
