/**
 * 编辑普通模板页面 author 梁雪峰
 */

var pathList=[];
var initPreviewConfig=[];
var ks = {};
$(document).ready(function() {
	/* 自定义监听器 */
	listenerMajorFileUpload();
	/* 初始化 */
	initMajorFileUpload();
});

function listenerMajorFileUpload(){

}

function initMajorFileUpload(){
	//初始化附件上传插件
	initImages();

}

//附件上传
function initFileUpload() {
	$("#file").fileinput({
		language : 'zh',
		uploadUrl : getRootPath()+"/majordata/majorFillUploadPDF.json",
		showUpload: true, //是否显示上传按钮
		showRemove : false, //显示移除按钮
		showPreview : true, //是否显示预览
		showCaption: true,//是否显示标题
		autoReplace : true,
		dropZoneEnabled: true,//是否显示拖拽区域
		minFileCount: 0,
		uploadAsync: true,
		preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
		previewFileIconSettings: { // configure your icon file extensions
			'doc': '<i class="fa fa-file-word-o text-primary"></i>',
			'xls': '<i class="fa fa-file-excel-o text-success"></i>',
			'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
			'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
			'txt': '<i class="fa fa-file-text-o text-info"></i>',
			'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
			'htm': '<i class="fa fa-file-code-o text-info"></i>',
			'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
			'mp3': '<i class="fa fa-file-audio-o text-warning"></i>'
		},
		initialPreview:pathList,
		initialPreviewAsData: true,
		initialPreviewConfig:initPreviewConfig,
		maxFileCount: 10,//最大上传数量
		browseOnZoneClick: true,
		browseClass:"btn btn-primary",
		msgFilesTooMany: "选择上传的文件数量 超过允许的最大数值！",
		enctype: 'multipart/form-data',
		overwriteInitial: false,//不覆盖已上传的图片
		allowedFileExtensions : [ "pdf" ],
		browseClass : "btn btn-primary", //按钮样式
		previewFileIcon : "<i class='glyphicon glyphicon-king'></i>"
	}).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
		initImages();
	});

}


//附件展示
function initImages(){
	// var majorId = $("#hidden_majorId").val();
	// if(majorId != ""){
		$.post(
			getRootPath()+"/majordata/majorFillgetImagesById.json",
			/*<embed class="kv-preview-data file-preview-pdf file-zoom-detail" src="blob:http://localhost:8080/c980b3b3-fc78-43ac-9c2c-f8a0c948e905" type="application/pdf" style="width: 100%; height: 100%; min-height: 480px;">*/
			function(data) {
				console.log(data);
				if(data.length > 0){
					$(data).each(function(index,value){
						pathList[index] = getRootPath()+"/majordata/majorFillshowFile.json?name="+value.name;
						ks = {
							type: value.type,
							caption: value.sourceName,
							size: value.size,
							url: getRootPath()+"/majordata/majorFilldeleteFile.json",
							key: value.id
						};
						initPreviewConfig[index] = ks;
					})

				}
				initFileUpload();
			}
		);
	// }
}