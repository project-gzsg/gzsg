package net.webset.wapper;

import org.apache.commons.lang3.StringUtils;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import net.webset.entity.SchoolData;
import net.webset.util.Utils;

public class SchoolDataWapper extends QueryWrapper<SchoolData>  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer createId;
	
	private String schoolName;
	
	private String leName;
	
	private String sort;
	
	private String sortOrder;

	public Integer getCreateId() {
		return createId;
	}

	public void setCreateId(Integer createId) {
		this.createId = createId;
		if (this.createId != null) {
			this.eq(SchoolData.CREATEID, this.createId);
		}
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
		if (StringUtils.isNotBlank(this.schoolName)) {
			this.like(SchoolData.SCHOOLNAME, this.schoolName);
		}
	}

	public String getLeName() {
		return leName;
	}

	public void setLeName(String leName) {
		this.leName = leName;
		if (StringUtils.isNotBlank(this.leName)) {
			this.like(SchoolData.LENAME, this.leName);
		}
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
		this.initOrder();
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
		this.initOrder();
	}
	
	//升降序操作。
	public void initOrder() {
		if(StringUtils.isNoneBlank(this.sort) && StringUtils.isNoneBlank(this.sortOrder)) {
			Object clumn = "";
			String[] fild = Utils.getFiledName(new SchoolData());
			for(String f : fild) {
				if(f.equals(this.sort.toUpperCase())) {
					clumn = Utils.getFieldValueByName(f,SchoolData.class);
				}
			}
			this.orderBy(true, "asc".equals(this.sortOrder), new String[] {clumn.toString()});
		}
		
	}
	
	
}
