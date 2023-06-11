import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments } from 'src/app/core/interfaces/comments';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
	selector: 'app-comment-component',
	templateUrl: './comment-component.component.html',
	styleUrls: ['./comment-component.component.css'],
})
export class CommentComponentComponent implements OnInit {
	comment = '';
	id = '';
	name = '';
	arrComments: IComments[] | undefined;
	activeComments = {
		id: '',
		comments: [
			{
				text: 'Comment',
				date: '00:00:00',
				name: '',
			},
		],
	};

	constructor(private activeRoute: ActivatedRoute, private listProducts: CommentService) {}

	ngOnInit() {
		this.id = this.activeRoute.snapshot.params['id'];
		this.arrComments = this.listProducts.getListComments();
		this.arrComments.forEach((element) => {
			if (element.id === this.id) {
				this.activeComments = element;
			}
		});
		if (this.activeComments.comments[0].text === 'Comment') {
			this.activeComments.comments.shift();
		}
	}

	onClick() {
		this.activeComments.id = this.id;
		const newObj = {
			text: this.comment,
			date: new Date().toLocaleString(),
			name: this.name,
		};
		this.activeComments.comments.push(newObj);
		this.listProducts.setListComments(this.activeComments);
		this.listProducts.getNumberComments();
		this.comment = '';
		this.name = '';
	}
}
